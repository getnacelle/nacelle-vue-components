export const get = () => {
  return JSON.stringify({
    testDataProperty1: 1,
    testDataProperty2: 2,
    testDataProperty3: 3
  })
}
export const set = name => {
  switch (name) {
    case 'session':
      return JSON.stringify({
        anonymousID: '12345',
        sessionID: '123456'
      })
  }
}
