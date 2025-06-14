import { atom } from 'jotai';

export type FileTab = {
  id: string; // 파일의 고유 식별자
  name: string; // 파일명
  content: string; // 파일 내용
  isOpened: boolean; // 파일 열려있는지 여부
  isModified: boolean; // 파일 수정되었는지 여부
};

export const tabsAtom = atom<FileTab[]>([]);
