import * as monaco from 'monaco-editor';
import { useEffect, useRef } from 'react';

interface MonacoEditorProps {
  content: string;
}

export const MonacoEditor = ({ content }: MonacoEditorProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current && !monacoInstance.current) {
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        value: content,
        language: 'plaintext',
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: 'on',
        automaticLayout: true,
      });
    }
    return () => {
      monacoInstance.current?.dispose();
      monacoInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (monacoInstance.current) {
      const model = monacoInstance.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, 'plaintext');
        monacoInstance.current.setValue(content);
      }
    }
  }, [content]);

  return <div ref={editorRef} style={{ width: '100%', height: '100%' }} />;
};
