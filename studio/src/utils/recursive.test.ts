import { generateId } from './generateId'
import { duplicateComponent, deleteComponent } from './recursive'

jest.mock('./generateId')

const mockGenerateId: jest.Mock<typeof generateId> = generateId as any

describe('recursive functions', () => {
  let id = 1
  let mockFn: typeof mockGenerateId

  beforeAll(() => {
    // @ts-ignore
    mockFn = mockGenerateId.mockImplementation(() => {
      return `comp-${id++}`
    })
  })

  afterEach(() => {
    id = 1
  })

  afterAll(() => {
    mockFn.mockClear()
  })

  it('should duplicate a Box component containing an Avatar', () => {
    const initialComponents: IComponents = {}

    const first = generateId()
    const second = generateId()

    initialComponents.root = {
      id: 'root',
      type: 'Box',
      parent: 'root',
      props: {},
      children: [first],
    }

    initialComponents[first] = {
      id: first,
      type: 'Box',
      parent: 'root',
      props: {},
      children: [second],
    }

    initialComponents[second] = {
      id: second,
      type: 'Avatar',
      parent: first,
      props: {},
      children: [],
    }

    const { clonedComponents } = duplicateComponent(
      initialComponents[first],
      initialComponents,
    )

    expect(Object.keys(clonedComponents).length).toEqual(2)

    const finalTree = {
      ...initialComponents,
      ...clonedComponents,
    }

    const avatars = Object.keys(finalTree).filter(
      compKey => finalTree[compKey].type === 'Avatar',
    )
    const boxes = Object.keys(finalTree).filter(
      compKey => finalTree[compKey].type === 'Box',
    )

    expect(avatars.length).toEqual(2)
    expect(boxes.length).toEqual(3)
  })

  it('should remove a Box containing an avatar and a badge', () => {
    const initialComponents: IComponents = {}

    const first = generateId()
    const second = generateId()
    const third = generateId()

    initialComponents.root = {
      id: 'root',
      type: 'Box',
      parent: 'root',
      props: {},
      children: [first],
    }

    initialComponents[first] = {
      id: first,
      type: 'Box',
      parent: 'root',
      props: {},
      children: [second],
    }

    initialComponents[second] = {
      id: second,
      type: 'Avatar',
      parent: first,
      props: {},
      children: [third],
    }

    initialComponents[third] = {
      id: third,
      type: 'AvatarBadge',
      parent: second,
      props: {},
      children: [],
    }

    const updatedComponents = deleteComponent(
      initialComponents[first],
      initialComponents,
    )

    expect(Object.keys(updatedComponents).length).toEqual(1)
    expect(Object.keys(updatedComponents)[0]).toEqual('root')
  })
})
