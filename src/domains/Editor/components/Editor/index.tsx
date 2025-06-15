import { fileContentAtom } from '@/atoms/fileContentAtom';
import { tabsAtom } from '@/atoms/tabsAtom';
import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { useFilePreviewType } from '../../hooks/useFilePreviewType';
import { FileImagePreview } from './FileImagePreview';
import { MonacoEditor } from './MonacoEditor';

export const Editor = () => {
  const [tabs, setTabs] = useAtom(tabsAtom);
  const fileContentMap = useAtomValue(fileContentAtom);

  const openedTab = tabs.find(tab => tab.isOpened);
  const content = openedTab ? (fileContentMap[openedTab.id] ?? '') : '';
  const previewType = useFilePreviewType(openedTab?.name);

  const handleContentChange = useCallback(() => {
    setTabs(prev => prev.map(tab => (tab.id === openedTab?.id ? { ...tab, isModified: true } : tab)));
  }, [openedTab?.id, setTabs]);

  if (!openedTab) {
    return <div>No file selected</div>;
  }

  if (previewType === 'image') {
    return <FileImagePreview fileName={openedTab.name} content={content} />;
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MonacoEditor content={content} fileName={openedTab.name} onContentChange={handleContentChange} />
    </div>
  );
};
