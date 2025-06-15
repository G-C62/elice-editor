import type { FileTab } from '@/atoms/tabsAtom';
import { tabsAtom } from '@/atoms/tabsAtom';
import { useSetAtom } from 'jotai';

export function useTabsActions() {
  const setTabs = useSetAtom(tabsAtom);

  // 탭 열기/활성화 (VSCode 스타일: 하나만 isOpened)
  const openOrActivateTab = (file: { id: string; name: string }) => {
    setTabs((prev: FileTab[]) => {
      const already = prev.find(tab => tab.id === file.id);
      if (already) {
        return prev.map(tab => (tab.id === file.id ? { ...tab, isOpened: true } : { ...tab, isOpened: false }));
      }
      return [
        ...prev.map(tab => ({ ...tab, isOpened: false })),
        {
          id: file.id,
          name: file.name,
          isOpened: true,
          isModified: false,
        },
      ];
    });
  };

  // 탭 닫기
  const closeTab = (id: string) => {
    setTabs((prev: FileTab[]) => prev.filter(tab => tab.id !== id));
  };

  return { openOrActivateTab, closeTab };
}
