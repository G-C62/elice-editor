import * as monaco from 'monaco-editor';
import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

export function useMonacoModel(
  editorRef: RefObject<HTMLDivElement | null>,
  content: string,
  language: string,
  theme: string,
  onContentChange: () => void
) {
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const modelRef = useRef<monaco.editor.ITextModel | null>(null);

  // 에디터 및 모델 초기화 (최초 1회)
  useEffect(() => {
    if (editorRef.current && !monacoInstance.current) {
      modelRef.current = monaco.editor.createModel(content, language);
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        model: modelRef.current,
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: 'on',
        automaticLayout: true,
        theme,
      });

      // Undo/Redo 단축키
      monacoInstance.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ, () => {
        monacoInstance.current?.trigger('keyboard', 'undo', null);
      });
      monacoInstance.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyZ, () => {
        monacoInstance.current?.trigger('keyboard', 'redo', null);
      });

      // 내용 변경 이벤트
      const disposable = modelRef.current.onDidChangeContent(() => {
        onContentChange();
      });

      return () => {
        disposable.dispose();
        monacoInstance.current?.dispose();
        monacoInstance.current = null;
        modelRef.current?.dispose();
        modelRef.current = null;
      };
    }
  }, [content, editorRef, language, theme, onContentChange]);

  // content prop이 바뀌면 setValue로만 갱신
  useEffect(() => {
    if (modelRef.current && modelRef.current.getValue() !== content) {
      modelRef.current.setValue(content);
    }
  }, [content]);

  // language prop이 바뀌면 setModelLanguage로만 갱신
  useEffect(() => {
    if (modelRef.current && modelRef.current.getLanguageId() !== language) {
      monaco.editor.setModelLanguage(modelRef.current, language);
    }
  }, [language]);

  // theme prop이 바뀌면 setTheme 호출
  useEffect(() => {
    monaco.editor.setTheme(theme);
  }, [theme]);
}
