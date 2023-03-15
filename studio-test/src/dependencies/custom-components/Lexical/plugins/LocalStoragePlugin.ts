import { useCallback, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import useDebounce from '../../../hooks/useDebounce.hook';

type LocalStoragePluginProps = {
  namespace: string;
};

export function LocalStoragePlugin({ namespace }: LocalStoragePluginProps):any {
  const [editor] = useLexicalComposerContext();

  /* fonction de sauvegarde */
  const saveContent = useCallback(
    (content: string) => {
      localStorage.setItem(namespace, content);
    },
    [namespace]
  );

  // const debouncedSaveContent = useDebounce(saveContent, 500)

  // useEffect(() => {

  //   return editor.registerUpdateListener(
  //     ({ editorState, dirtyElements, dirtyLeaves }) => {
  //       // Don't update if nothing changed
  //       if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;

  //       const serializedState = JSON.stringify(editorState);
  //       // debouncedSaveContent(serializedState);
  //     }
  //   );
  // }, [debouncedSaveContent, editor]);

  return null;
}