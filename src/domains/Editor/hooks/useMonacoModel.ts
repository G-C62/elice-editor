import * as monaco from 'monaco-editor';
import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

export function useMonacoModel(
  editorRef: RefObject<HTMLDivElement | null>,
  content: string,
  language: string,
  theme: string
) {
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const modelRef = useRef<monaco.editor.ITextModel | null>(null);

  useEffect(() => {
    if (editorRef.current && !monacoInstance.current) {
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        value: content,
        language,
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: 'on',
        automaticLayout: true,
        theme,
      });

      // Undo (Ctrl+Z)
      monacoInstance.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ, () => {
        monacoInstance.current?.trigger('keyboard', 'undo', null);
      });

      // Redo (Ctrl+Shift+Z)
      monacoInstance.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyZ, () => {
        monacoInstance.current?.trigger('keyboard', 'redo', null);
      });
    }
    return () => {
      monacoInstance.current?.dispose();
      monacoInstance.current = null;
      modelRef.current?.dispose();
      modelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (monacoInstance.current) {
      if (modelRef.current) {
        modelRef.current.dispose();
      }
      modelRef.current = monaco.editor.createModel(content, language);
      monacoInstance.current.setModel(modelRef.current);
      monaco.editor.setTheme(theme);
    }
  }, [content, language, theme]);
}
