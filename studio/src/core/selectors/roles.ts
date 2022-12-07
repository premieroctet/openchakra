import { RootState } from '~core/store'

export const getRoles = (state: RootState) => {
  return state.roles.roles
}
