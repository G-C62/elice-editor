import { tabsAtom } from '@/atoms/tabsAtom';
import { useTabsActions } from '@/hooks/useTabsActions';
import { useAtom } from 'jotai';
import styled from 'styled-components';

const TabsContainer = styled.div`
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  height: 40px;
  align-items: center;
`;

const Tab = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  border-right: 1px solid #dee2e6;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  position: relative;
  color: #1e1e1e;
  font-size: 13px;
  user-select: none;
`;

const TabTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ModifiedDot = styled.span`
  color: #1e1e1e;
  font-size: 16px;
  line-height: 1;
`;

const CloseButton = styled.button`
  margin-left: 8px;
  background: transparent;
  border: none;
  color: #888;
  font-size: 14px;
  cursor: pointer;
  padding: 0 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #1e1e1e;
  }
`;

export const Tabs = () => {
  const [tabs, setTabs] = useAtom(tabsAtom);
  const { openOrActivateTab } = useTabsActions();

  const handleClose = (id: string) => {
    setTabs(prev => {
      const nextTabs = prev.filter(tab => tab.id !== id);
      const hasOpened = nextTabs.some(tab => tab.isOpened);
      if (!hasOpened && nextTabs.length > 0) {
        return nextTabs.map((tab, idx) => (idx === 0 ? { ...tab, isOpened: true } : { ...tab, isOpened: false }));
      }
      return nextTabs;
    });
  };

  const handleTabClick = (id: string, name: string) => {
    openOrActivateTab({ id, name });
  };

  return (
    <TabsContainer>
      {tabs.map(tab => (
        <Tab key={tab.id} $active={tab.isOpened} onClick={() => handleTabClick(tab.id, tab.name)}>
          <TabTitle>
            {tab.name}
            {tab.isModified && <ModifiedDot>•</ModifiedDot>}
          </TabTitle>
          <CloseButton
            onClick={e => {
              e.stopPropagation();
              handleClose(tab.id);
            }}
          >
            ×
          </CloseButton>
        </Tab>
      ))}
    </TabsContainer>
  );
};
