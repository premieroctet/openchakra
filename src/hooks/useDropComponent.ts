import { useDrop } from "react-dnd";
import { COMPONENTS } from "../App";
import { useBuilderContext } from "../contexts/BuilderContext";

const DEFAULT_PROPS: PreviewDefaultProps = {
  Badge: {},
  Box: {},
  Button: {},
  IconButton: {},
  Icon: {},
  Image: {},
  Text: {},
  Progress: {},
  Link: {},
  Code: {},
  Spinner: {},
  TextArea: {},
  Heading: {},
  CloseButton: {},
  Tag: {},
  SimpleGrid: {},
  Switch: {
    isChecked: true
  },
  CircularProgress: {},
  Checkbox: {
    isChecked: true
  },
  AvatarBadge: {},
  AvatarGroup: { spacing: -3, max: 2, size: "md" },
  Avatar: {
    name: "John Doe",
    size: "md"
  }
};

export const useDropComponent = (
  componentName: string,
  accept: ComponentType[] = COMPONENTS
) => {
  const { components, setComponents } = useBuilderContext();

  const [{ isOver }, drop] = useDrop({
    accept,
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true })
    }),
    drop: (item: ComponentItemProps, monitor) => {
      if (monitor.isOver()) {
        const name = `comp-${Math.round(new Date().getTime() / 1000)}`;

        setComponents({
          ...components,
          [componentName]: {
            ...components[componentName],
            children: [...components[componentName].children, name]
          },
          [name]: {
            name,
            props: DEFAULT_PROPS[item.type] || {},
            children: [],
            type: item.type,
            parent: componentName
          }
        });
      }
    }
  });

  return { drop, isOver };
};
