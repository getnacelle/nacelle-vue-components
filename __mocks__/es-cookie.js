export const get = name => {
  switch (name) {
    case 'user-data':
      return JSON.stringify({
        testDataProperty1: 1,
        testDataProperty2: 2,
        testDataProperty3: 3
      })
    case 'session-id':
      return '123456'
  }
}
export const set = name => {
  switch (name) {
    case 'session-id':
      return '123456'
  }
}
