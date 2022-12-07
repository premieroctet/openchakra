const types = require("./types.json");
const fs = require("fs");
const references = {};

const inferType = (type, children) => {
  if (type.type === "union") {
    if (
      type.types.length === 3 &&
      type.types[1].name === "false" &&
      type.types[2].name === "true"
    ) {
      return { type: "boolean" };
    } else if (
      type.types.length === 2 &&
      type.types[0].name === "undefined" &&
      type.types[1].name === "string"
    ) {
      return { type: "string" };
    } else if (
      type.types.length === 2 &&
      type.types[0].name === "undefined" &&
      type.types[1].type === "reflection"
    ) {
      return { type: "callback" };
    } else if (
      type.types.length > 0 &&
      type.types[0].type === "stringLiteral"
    ) {
      return {
        type: "enum",
        choices: type.types.map(item => item.value)
      };
    }
  }

  return { type: "string" };
};

types.children
  .filter(child => !!child.children)
  .filter(child => child.kindString === "Interface")
  .map(child => {
    references[child.sources[0].fileName.split("/")[0]] = child.children.map(
      props => {
        const { name, type, comment } = props;
        return {
          name,
          type: inferType(type, types.children),
          description: comment && comment.shortText
        };
      }
    );
  });

fs.writeFileSync("./ref.json", JSON.stringify(references));
