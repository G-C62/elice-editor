import { useAtomValue } from 'jotai';
import { fileTreeAtom } from '../atoms/fileTreeAtoms';

export function useFileTree() {
  const fileTree = useAtomValue(fileTreeAtom);
  return fileTree;
}
