export const findUserComponentById = (
  id: string,
  userComponents: IUserComponent,
) => {
  if (userComponents.root.id === id) {
    return { isRoot: true, component: userComponents.root }
  }

  return { isRoot: false, component: userComponents.components[id] }
}
