import { atom } from 'jotai';

export type FileNode = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
};

export const fileTreeAtom = atom<FileNode | null>(null);
