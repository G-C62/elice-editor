import { fileContentAtom } from '@/atoms/fileContentAtom';
import { tabsAtom } from '@/atoms/tabsAtom';
import { useAtomValue } from 'jotai';

export const MonacoEditor = () => {
  const tabs = useAtomValue(tabsAtom);
  const fileContentMap = useAtomValue(fileContentAtom);

  // 현재 열린 탭 찾기
  const openedTab = tabs.find(tab => tab.isOpened);
  // 해당 탭의 파일 내용
  const content = openedTab ? (fileContentMap[openedTab.id] ?? '') : '';

  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'monospace', fontSize: 14, padding: 16 }}>
      {openedTab ? (
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{content}</pre>
      ) : (
        <div style={{ color: '#888', fontStyle: 'italic' }}>No file selected</div>
      )}
    </div>
  );
};
