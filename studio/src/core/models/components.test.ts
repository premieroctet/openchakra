import project, { ProjectState, INITIAL_COMPONENTS } from './project'
import { onboarding } from '~templates/onboarding'
import produce from 'immer'

const STATE: ProjectState = {
  components: {
    'button-testid': {
      children: [],
      id: 'button-testid',
      parent: 'root',
      props: { children: 'Button text', variant: 'solid', size: 'md' },
      rootParentType: 'Button',
      type: 'Button',
    },
    root: {
      children: ['button-testid'],
      id: 'root',
      parent: 'root',
      props: {},
      type: 'Box',
    },
  },
  selectedId: 'button-testid',
}

describe('Components model', () => {
  it('should reset the state', async () => {
    const state: ProjectState = {
      components: INITIAL_COMPONENTS,
      selectedId: 'root',
    }

    const nextState = project.reducers.reset(state)
    expect(nextState).toEqual(state)
  })

  it('should load a demo', async () => {
    const state: ProjectState = {
      components: INITIAL_COMPONENTS,
      selectedId: 'root',
    }

    const nextState = project.reducers.loadDemo(state, 'onboarding')
    expect(nextState).toEqual({
      components: onboarding,
      selectedId: 'comp-root',
    })
  })

  it('should reset props', async () => {
    return produce(STATE, (draftState: ProjectState) => {
      draftState.components['button-testid'].props = {
        children: 'Button text',
        variant: 'ghost',
      }

      const nextState = project.reducers.resetProps(
        draftState,
        'button-testid',
      )

      expect(nextState.components['button-testid'].props).toEqual({
        children: 'Button text',
        variant: 'solid',
        size: 'md',
      })
    })
  })

  it('should update props', async () => {
    const nextState = project.reducers.updateProps(STATE, {
      id: 'button-testid',
      name: 'colorScheme',
      value: 'teal.300',
    })

    expect(nextState.components['button-testid'].props).toEqual({
      children: 'Button text',
      colorScheme: 'teal.300',
      variant: 'solid',
      size: 'md',
    })
  })

  it('should add a new component', async () => {
    const state: ProjectState = {
      components: INITIAL_COMPONENTS,
      selectedId: 'root',
    }

    const nextState = project.reducers.addComponent(state, {
      parentName: 'root',
      type: 'Button',
      testId: 'button-testid',
    })

    expect(nextState).toEqual(STATE)
  })

  it('should delete a simple component', async () => {
    const nextState = project.reducers.deleteComponent(
      STATE,
      'button-testid',
    )

    expect(nextState).toEqual({
      components: INITIAL_COMPONENTS,
      selectedId: 'root',
    })
  })

  it('should move a component', async () => {
    return produce(STATE, (draftState: ProjectState) => {
      draftState.components['box-testid'] = {
        children: [],
        id: 'box-testid',
        parent: 'root',
        props: {},
        rootParentType: 'Box',
        type: 'Box',
      }

      expect(draftState.components['root'].children).toContain('button-testid')

      const nextState = project.reducers.moveComponent(draftState, {
        parentId: 'box-testid',
        componentId: 'button-testid',
      })

      expect(nextState.components['box-testid'].children).toContain(
        'button-testid',
      )

      expect(nextState.components['root'].children).not.toContain(
        'button-testid',
      )
    })
  })

  it('should move a selected component', async () => {
    return produce(STATE, (draftState: ProjectState) => {
      draftState.components['box-testid'] = {
        children: [],
        id: 'box-testid',
        parent: 'root',
        props: {},
        rootParentType: 'Box',
        type: 'Box',
      }

      draftState.selectedId = 'root'
      draftState.components['root'].children.push('box-testid')

      expect(draftState.components['root'].children).toEqual([
        'button-testid',
        'box-testid',
      ])

      const nextState = project.reducers.moveSelectedComponentChildren(
        draftState,
        {
          fromIndex: 0,
          toIndex: 1,
        },
      )

      expect(nextState.components['root'].children).toEqual([
        'box-testid',
        'button-testid',
      ])
    })
  })

  it('should select a component', async () => {
    expect(STATE.selectedId).toEqual('button-testid')
    const nextState = project.reducers.select(STATE, 'root')
    expect(nextState.selectedId).toEqual('root')
  })

  it('should unselect a component', async () => {
    expect(STATE.selectedId).toEqual('button-testid')
    const nextState = project.reducers.unselect(STATE)
    expect(nextState.selectedId).toEqual('root')
  })
})
