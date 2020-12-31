import brcast from './index'

test('default export is a function', () => {
  expect(typeof brcast).toBe('function')
})

test('throws if listener is not a function', () => {
  const broadcast = brcast()
  expect(() => broadcast.subscribe()).toThrow()

  expect(() => broadcast.subscribe('throw')).toThrow()

  expect(() => broadcast.subscribe({})).toThrow()

  expect(() => broadcast.subscribe(() => {})).not.toThrow()
})

test('is able to start with an undefined state and update it accordingly', () => {
  const broadcast = brcast()
  expect(broadcast.getState()).toBeUndefined()
  broadcast.setState(2)
  expect(broadcast.getState()).toBe(2)
})

test('it updates the state', () => {
  const handler = jest.fn()
  const broadcast = brcast()
  broadcast.subscribe(handler)
  broadcast.setState(2)
  expect(handler.mock.calls.length).toBe(1)
  expect(handler.mock.calls[0][0]).toBe(2)
})

test('it unsubscribes only relevant listeners', () => {
  const handler = jest.fn()
  const handler1 = jest.fn()
  const broadcast = brcast(1)
  const subscription = broadcast.subscribe(handler)
  broadcast.subscribe(handler1)
  expect(typeof subscription).toBe('function')
  subscription()
  broadcast.setState(2)
  broadcast.setState(3)
  expect(handler.mock.calls.length).toBe(0)
  expect(handler1.mock.calls.length).toBe(2)
})

test('removes listeners only once when unsubscribing more than once', () => {
  const handler = jest.fn()
  const broadcast = brcast(1)
  const subscription = broadcast.subscribe(handler)

  subscription()
  subscription()
  broadcast.setState(2)
  expect(handler.mock.calls.length).toBe(0)
})

test('supports removing a subscription within a subscription', () => {
  const broadcast = brcast(1)
  const handler = jest.fn()
  const handler1 = jest.fn()
  const handler2 = jest.fn()

  broadcast.subscribe(handler)
  const unSub1 = broadcast.subscribe(() => {
    handler1()
    unSub1()
  })
  broadcast.subscribe(handler2)

  broadcast.setState(2)
  broadcast.setState(3)
  expect(handler.mock.calls.length).toBe(2)
  expect(handler1.mock.calls.length).toBe(1)
  expect(handler2.mock.calls.length).toBe(2)
})

test('do not notify subscribers getting unsubscribed in the middle of a setState', () => {
  const broadcast = brcast()

  const unsubscribeHandles = []
  const doUnsubscribeAll = () =>
    unsubscribeHandles.forEach(unsubscribe => unsubscribe())

  const handler = jest.fn()
  const handler1 = jest.fn()
  const handler2 = jest.fn()

  unsubscribeHandles.push(broadcast.subscribe(handler))
  unsubscribeHandles.push(
    broadcast.subscribe(() => {
      handler1()
      doUnsubscribeAll()
    })
  )
  unsubscribeHandles.push(broadcast.subscribe(handler2))

  broadcast.setState(2)
  expect(handler.mock.calls.length).toBe(1)
  expect(handler1.mock.calls.length).toBe(1)
  expect(handler2.mock.calls.length).toBe(0)

  broadcast.setState(3)
  expect(handler.mock.calls.length).toBe(1)
  expect(handler1.mock.calls.length).toBe(1)
  expect(handler2.mock.calls.length).toBe(0)
})
