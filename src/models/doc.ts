interface IDoc {
  [name: string]: string;
}

const docs: IDoc = {
  Button:
    "Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation.",
  Badge: "Badges are used to highlight an item's status for quick recognition.",
  Box:
    "Box is the most abstract component on top of which all other Chakra UI components are built. By default, it renders a div element",
  Image:
    "The Image component is used to display images. Image composes Box so you can use all the style props and add responsive styles as well.",
  Icon:
    "Use the Icon component to easily render svg icons. Chakra UI provides basic interface icons, to add your icons, read the guide.",
  Text:
    "Text is the used to render text and paragraphs within an interface. It renders a p tag by default."
};

export default docs;
