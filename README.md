# OpenChakra ⚡️

> Visual editor for Chakra UI — https://openchakra.app

OpenChakra is a visual editor for the best component library in town: [Chakra UI](https://chakra-ui.com)🤗. Quickly draft your component with the simple and modular drag n drop UI.

- 🎨 Drag and drop [Chakra UI](https://chakra-ui.com/getting-started) components
- 💅 Preset components
- 👀 Live props editing and styling
- ⚛️ Production-ready code
- 🎈 CodeSandbox export
- 🔮 Undo/redo edit
- 💽 Localstorage sync
- 🐦 Shareable URL

[![Screenshot](splash.png)](https://openchakra.app)

[✨Try creating component without code right now](https://openchakra.app) (⚠️ OpenChakra still under alpha, beta, gamma versions or what you want 👷‍♂️)

## Demo

- Airbnb Card
- Product Hunt Layout
- Twitter Timeline

## Getting started

**Builder mode**

The Builder mode adds extra padding/border to ease components selection (like containers).

> 💡Toggle the Builder mode with the `b` shortcut

**Code panel**

Toggle the code panel for viewing the JSX/React code of your components (readonly). You can export your code directly in CodeSandbox!

**Components panel**

You can drag a Chakra UI components or drag a components "preset". A preset is a group of components (like Accordion, FormControl).

**Inspector**

Edit the props of the active components in the top panel. You can also styling your component with the others panels. The top bar allow you to delete, reset your component. And even view the Chakra UI documentation!

**Editor**

You can directly drag an drop components in anothter container but you can't sort them. For that, select the container component and open the Children panel in the Inspector: you can sort the children!

> 💡Toggle the Code panel with the `c` shortcut

**Shortcuts**

| Shortcut         | Description               |
| ---------------- | ------------------------- |
| `cmd+Z` `ctrl+Z` | Undo last action          |
| `cmd+Y` `ctrl+y` | Redo action               |
| `del`            | Delete selected component |
| `c`              | Toggle Code panel         |
| `b`              | Toggle Builder mode       |

## Roadmap

- More Chakra UI components integration
- Components copy
- Props panel improvements
- Code generation improvements
- Dark mode support
- Custom presets
- Custom theme
- Handle PseudoBox state (hover, active…)
- Fix bugs 🧨

* Fix props panel switching bug
* Popover soon
* Grid soon
* heignt 100% stack and flex
* TypeError: child is undefined
   \*src/components/inspector/children/ChildrenList.tsx:20
* Reset props of preset bug
