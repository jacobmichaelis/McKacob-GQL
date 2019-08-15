import { Test } from '../entity/Test'

const returnOne = 'RETURNING id, username, password, encrypted'
const returnAll = 'RETURNING *'

async function getTestData() {
  return await Test.find()
}

async function login(root, args) {
  let test = new Test()
  if (args.id) test.id = args.id
  test.username = args.username
  test.password = args.password
  test.encrypted = (args.encrypted) ? args.encrypted : args.password
  await test.save()
  return test
}

async function deleteUser(root, args) {
  let test = await Test.findOne({ id: args.id })
  test.remove()
  return test
}

const testResolver = {
  Query: {
    test: () => getTestData()
  },
  Mutation: {
    testLogin: (root, args) => login(root, args),
    deleteTestUser: (root, args) => deleteUser(root, args)
  }
}

export default testResolver