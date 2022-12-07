const TypeDoc = require("typedoc");

const app = new TypeDoc.Application();

// If you want TypeDoc to load tsconfig.json / typedoc.json files
app.options.addReader(new TypeDoc.TSConfigReader());
app.options.addReader(new TypeDoc.TypeDocReader());

app.bootstrap({
  mode: "file",
  includeDeclarations: true,
  excludeExternals: true
});

//node_modules/@chakra-ui/core/dist/theme/icons.d.ts
const COMPONENTS = [
  "Badge",
  "Checkbox",
  "Button",
  "Image",
  "Badge",
  "Icon",
  "Text",
  "Avatar",
  "AvatarGroup",
  "AvatarBadge",
  "Tag"
];
const project = app.convert(
  app.expandInputFiles(
    COMPONENTS.map(
      name => `../node_modules/@chakra-ui/core/dist/${name}/index.d.ts`
    )
  )
);

if (project) {
  // Project may not have converted correctly
  app.generateJson(project, "types.json");
}
