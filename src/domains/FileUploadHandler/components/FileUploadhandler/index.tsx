import styled from '@emotion/styled';
import { FileDownloadButton } from './FileDownloadButton';
import { FileUploadButton } from './FileUploadButton';

const FileUploadHandlerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export function FileUploadHandler() {
  return (
    <FileUploadHandlerContainer>
      <FileUploadButton />
      <FileDownloadButton />
    </FileUploadHandlerContainer>
  );
}
