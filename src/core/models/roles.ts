import { createModel } from '@rematch/core'

export type Roles = {
  [key: string]: String
}

export type RolesState = {
  roles: Roles
}

const roles = createModel({
  state: {
    roles: {},
  } as RolesState,
  reducers: {
    setRoles(state: RolesState, roles: Roles): RolesState {
      return {
        ...state,
        roles: roles,
      }
    },
  },
})

export default roles
