import { fileTreeAtom } from '@/atoms/fileTreeAtom';
import type { FileTab } from '@/atoms/tabsAtom';
import { tabsAtom } from '@/atoms/tabsAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { FileTreeNode } from './FileTreeNode';

export const FileTree = () => {
  const fileTree = useAtomValue(fileTreeAtom);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const setTabs = useSetAtom(tabsAtom);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleOpenTab = useCallback(
    (file: { id: string; name: string }) => {
      setTabs((prev: FileTab[]) => {
        if (prev.some((tab: FileTab) => tab.id === file.id)) return prev;
        return [
          ...prev,
          {
            id: file.id,
            name: file.name,
            isOpened: true,
            isModified: false,
          },
        ];
      });
    },
    [setTabs]
  );

  if (!fileTree || !fileTree.children || fileTree.children.length === 0) {
    return <div style={{ color: '#888', fontStyle: 'italic' }}>No files</div>;
  }

  return (
    <>
      {fileTree.children.map(child => (
        <FileTreeNode
          key={child.id}
          node={child}
          depth={0}
          selectedId={selectedId}
          onSelect={handleSelect}
          onOpenTab={handleOpenTab}
        />
      ))}
    </>
  );
};
