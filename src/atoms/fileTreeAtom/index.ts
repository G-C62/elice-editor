import { atom } from 'jotai';

export type FileNode = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
};
export const fileTreeAtom = atom<FileNode | null>(null);
