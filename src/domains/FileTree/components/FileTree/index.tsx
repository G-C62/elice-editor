import { fileTreeAtom } from '@/atoms/fileTreeAtom';
import { useTabsActions } from '@/hooks/useTabsActions';
import { useAtomValue } from 'jotai';
import { useCallback, useState } from 'react';
import { FileTreeNode } from './FileTreeNode';

export const FileTree = () => {
  const fileTree = useAtomValue(fileTreeAtom);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { openOrActivateTab } = useTabsActions();

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

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
          onOpenTab={openOrActivateTab}
        />
      ))}
    </>
  );
};
