import React, { useContext, useState } from "react";

type Overlay = undefined | { rect: DOMRect; name: string; type: ComponentType };

interface EditorContextInterface {
  overlay: undefined | Overlay;
  setOverlay: (element: Overlay) => void;
}

const EditorContext = React.createContext<EditorContextInterface>({
  overlay: undefined,
  setOverlay: () => null
});

interface EditorProviderProps {
  children: React.ReactNode;
}

function EditorProvider(props: EditorProviderProps) {
  const [overlay, setOverlay] = useState();

  return (
    <EditorContext.Provider
      value={{
        overlay,
        setOverlay
      }}
      {...props}
    />
  );
}

function useEditorContext() {
  return useContext(EditorContext);
}

export { EditorProvider, useEditorContext };
