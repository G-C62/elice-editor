import { fileContentAtom } from '@/atoms/fileContentAtom';
import { tabsAtom } from '@/atoms/tabsAtom';
import { useAtomValue } from 'jotai';
import { useFilePreviewType } from '../../hooks/useFilePreviewType';
import { FileImagePreview } from './FileImagePreview';
import { MonacoEditor } from './MonacoEditor';

export const Editor = () => {
  const tabs = useAtomValue(tabsAtom);
  const fileContentMap = useAtomValue(fileContentAtom);

  const openedTab = tabs.find(tab => tab.isOpened);
  const content = openedTab ? (fileContentMap[openedTab.id] ?? '') : '';
  const previewType = useFilePreviewType(openedTab?.name);

  if (!openedTab) {
    return <div>No file selected</div>;
  }

  if (previewType === 'image') {
    return <FileImagePreview fileName={openedTab.name} content={content} />;
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MonacoEditor content={content} fileName={openedTab.name} />
    </div>
  );
};
