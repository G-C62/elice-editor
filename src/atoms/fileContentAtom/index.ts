import { atom } from 'jotai';

export const fileContentAtom = atom<{ [id: string]: string }>({});
