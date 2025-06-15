import { useMonacoModel } from '@/domains/Editor/hooks/useMonacoModel';
import { getLanguageFromFileName } from '@/domains/Editor/utils/editorUtils';
import { useRef } from 'react';

interface MonacoEditorProps {
  content: string;
  fileName?: string; // 예: "index.ts", "main.py" 등
  theme?: 'vs-dark' | 'vs-light';
}

export const MonacoEditor = ({ content, fileName, theme = 'vs-light' }: MonacoEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const language = getLanguageFromFileName(fileName);

  useMonacoModel(editorRef, content, language, theme);

  return <div ref={editorRef} style={{ width: '100%', height: '100%' }} />;
};
