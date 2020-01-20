import React, { useContext, useState } from "react";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

interface BuilderContextInterface {
  selectedComponent: string | undefined;
  selectedType: ComponentType | undefined;
  showLayout: boolean;
  showCode: boolean;
  setSelectedComponent: (componentName: string | undefined) => void;
  setShowLayout: (value: boolean) => void;
  setShowCode: (value: boolean) => void;
  setComponents: (components: IComponents) => void;
  setSelectedType: (type: ComponentType) => void;
  components: IComponents;
}

export const INITIAL_STATE = {
  root: {
    name: "root",
    parent: "root",
    type: "box" as ComponentType,
    children: []
  }
};

const BuilderContext = React.createContext<BuilderContextInterface>({
  components: {},
  showLayout: false,
  showCode: false,
  selectedComponent: undefined,
  selectedType: undefined,
  setSelectedComponent: () => null,
  setShowLayout: () => null,
  setShowCode: () => null,
  setComponents: () => null,
  setSelectedType: () => null
});

interface BuilderProviderProps {
  children: React.ReactNode;
}

function BuilderProvider(props: BuilderProviderProps) {
  const [selectedComponent, setSelectedComponent] = useState();
  const [showLayout, setShowLayout] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [selectedType, setSelectedType] = useState();

  const [componentsInStorage] = useLocalStorage<IComponents>(
    "components",
    INITIAL_STATE
  );

  const components = componentsInStorage || INITIAL_STATE;
  const setComponents = (value: IComponents) => {
    writeStorage("components", value);
  };

  return (
    <BuilderContext.Provider
      value={{
        components,
        showCode,
        showLayout,
        selectedComponent,
        selectedType,
        setSelectedComponent,
        setShowLayout,
        setComponents,
        setShowCode,
        setSelectedType
      }}
      {...props}
    />
  );
}

function useBuilderContext() {
  return useContext(BuilderContext);
}

export { BuilderProvider, useBuilderContext };
