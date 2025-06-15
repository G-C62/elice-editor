import { fileContentAtom } from '@/atoms/fileContentAtom';
import { tabsAtom } from '@/atoms/tabsAtom';
import { useAtomValue } from 'jotai';
import { MonacoEditor } from './MonacoEditor';

export const Editor = () => {
  const tabs = useAtomValue(tabsAtom);
  const fileContentMap = useAtomValue(fileContentAtom);

  const openedTab = tabs.find(tab => tab.isOpened);
  const content = openedTab ? (fileContentMap[openedTab.id] ?? '') : '';

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {openedTab ? <MonacoEditor content={content} /> : <div>No file selected</div>}
    </div>
  );
};
