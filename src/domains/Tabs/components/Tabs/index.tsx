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

const Tab = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  border-right: 1px solid #dee2e6;
  cursor: pointer;
  background: ${({ active }) => (active ? '#fff' : 'transparent')};
  position: relative;
`;

const CloseButton = styled.button`
  margin-left: 8px;
  background: transparent;
  border: none;
  color: #888;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #d32f2f;
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
        <Tab key={tab.id} active={tab.isOpened} onClick={() => handleTabClick(tab.id, tab.name)}>
          {tab.name}
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
