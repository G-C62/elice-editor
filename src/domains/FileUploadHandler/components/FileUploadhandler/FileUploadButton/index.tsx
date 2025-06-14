import JSZip from 'jszip';
import { useRef } from 'react';

export function FileUploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUploadButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      zip.forEach((relativePath, zipEntry) => {
        console.log('파일 경로:', relativePath);
        console.log('파일 내용:', zipEntry);
      });

      const firstFile = Object.values(zip.files)[0];
      if (firstFile) {
        const content = await firstFile.async('string');
        console.log('첫 번째 파일 내용:', content);
      }
    }
  };
  return (
    <>
      <button onClick={handleUploadButtonClick}>Upload</button>
      <input type="file" ref={inputRef} style={{ display: 'none' }} accept=".zip" onChange={handleFileChange} />
    </>
  );
}
