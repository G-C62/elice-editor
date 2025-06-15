import { fileContentAtom } from '@/atoms/fileContentAtom';
import { fileTreeAtom } from '@/atoms/fileTreeAtom';
import { useSetAtom } from 'jotai';
import JSZip from 'jszip';
import { useRef } from 'react';

// FileNode 타입 정의
type FileNode = {
  id: string; // zipEntry.name 전체 경로
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
};

function buildFileTree(zip: JSZip): FileNode {
  const root: FileNode = {
    id: 'root',
    name: '/',
    type: 'folder',
    children: [],
  };

  Object.values(zip.files).forEach(zipEntry => {
    const parts = zipEntry.name.split('/');
    let current = root;
    parts.forEach((part, idx) => {
      if (!part) return;
      let child = current.children!.find(c => c.name === part);
      if (!child) {
        const isFile = idx === parts.length - 1 && !zipEntry.dir;
        child = {
          id: isFile ? zipEntry.name : parts.slice(0, idx + 1).join('/'),
          name: part,
          type: isFile ? 'file' : 'folder',
          ...(isFile ? {} : { children: [] }),
        };
        current.children!.push(child);
      }
      current = child;
    });
  });

  return root;
}

// 파일 내용 해시 생성 함수
async function buildFileContentMap(zip: JSZip, node: FileNode, map: { [id: string]: string }) {
  if (node.type === 'file') {
    const zipEntry = zip.file(node.id); // id가 전체 경로
    if (zipEntry) {
      map[node.id] = await zipEntry.async('string');
    }
  } else if (node.children) {
    for (const child of node.children) {
      await buildFileContentMap(zip, child, map);
    }
  }
}

export function FileUploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const setFileTree = useSetAtom(fileTreeAtom);
  const setFileContent = useSetAtom(fileContentAtom);

  const handleUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      // 트리 구조 생성
      const tree = buildFileTree(zip);

      // 파일 내용 해시 생성
      const contentMap: { [id: string]: string } = {};
      await buildFileContentMap(zip, tree, contentMap);
      setFileTree(tree);
      setFileContent(contentMap);
    }
  };

  return (
    <>
      <button onClick={handleUploadButtonClick}>Upload</button>
      <input type="file" ref={inputRef} style={{ display: 'none' }} accept=".zip" onChange={handleFileChange} />
    </>
  );
}
