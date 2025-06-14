import { useAtomValue } from 'jotai';
import type { FileNode } from '../atoms/fileTreeAtoms';
import { fileTreeAtom } from '../atoms/fileTreeAtoms';

function findFileById(node: FileNode | null, id: string): FileNode | null {
  if (!node) return null;
  if (node.id === id && node.type === 'file') return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findFileById(child, id);
      if (found) return found;
    }
  }
  return null;
}

export function useFileContent(fileId: string) {
  const fileTree = useAtomValue(fileTreeAtom);
  const fileNode = findFileById(fileTree, fileId);
  return fileNode?.content ?? null;
}
