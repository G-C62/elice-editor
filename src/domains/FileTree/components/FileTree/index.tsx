import { fileTreeAtom } from '@/atoms/fileTreeAtom';
import { useAtomValue } from 'jotai';
import { FileTreeNode } from './FileTreeNode';

export const FileTree = () => {
  const fileTree = useAtomValue(fileTreeAtom);

  if (!fileTree || !fileTree.children || fileTree.children.length === 0) {
    return <div style={{ color: '#888', fontStyle: 'italic' }}>No files</div>;
  }

  return (
    <>
      {fileTree.children.map(child => (
        <FileTreeNode key={child.id} node={child} depth={0} />
      ))}
    </>
  );
};
