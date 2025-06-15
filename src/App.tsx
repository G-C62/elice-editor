import styled from 'styled-components';
import { FileTree } from './domains/FileTree/components/FileTree';
import { FileUploadHandler } from './domains/FileUploadHandler/components/FileUploadhandler';
import { MonacoEditor } from './domains/MonacoEditor/components/MonacoEditor';
import { Tabs } from './domains/Tabs/components/Tabs';

const AppContainer = styled.div`
  width: 98vw;
  height: 96vh;
  margin: 1vw auto;
  border: 3px solid black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  border: 2px solid black;
  padding: 1rem;
`;

const TabsBar = styled.div`
  border: 2px solid black;
`;

const MainArea = styled.div`
  flex: 1;
  display: flex;
  border: 2px solid black;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
`;

const FileTreeArea = styled.div`
  width: 220px;
  border-right: 2px solid black;
  display: flex;
  flex-direction: column;
`;

const EditorArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 500;
`;

export default function App() {
  return (
    <AppContainer>
      <TopBar>
        <FileUploadHandler />
      </TopBar>
      <MainArea>
        <FileTreeArea>
          <FileTree />
        </FileTreeArea>
        <ContentArea>
          <TabsBar>
            <Tabs />
          </TabsBar>
          <EditorArea>
            <MonacoEditor />
          </EditorArea>
        </ContentArea>
      </MainArea>
    </AppContainer>
  );
}
