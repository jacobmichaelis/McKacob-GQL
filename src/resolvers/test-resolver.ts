// import { queryOne, queryMany } from '../db/db-config'

// const returnOne = "RETURNING id, username, password, encrypted"
// const returnAll = "RETURNING *"

// function getTestData() {
//   return queryMany('SELECT * FROM test_table;')
// }

// function login(root, args) {
//   let id = args.id
//   let username = args.username
//   let password = args.password
//   let encrypted = (args.encrypted) ? args.encrypted : password
//   if (id) {
//     return queryOne(`INSERT INTO test_table(id, username, password, encrypted) VALUES ('${id}', '${username}', '${password}', '${encrypted}') ${returnOne};`)
//   } else {
//     return queryOne(`INSERT INTO test_table(username, password, encrypted) VALUES ('${username}', '${password}', '${encrypted}') ${returnOne};`)
//   }
// }

// function deleteUser(root, args) {
//   console.log(args)
//   let id = args.id
//   let q = queryOne(`DELETE FROM test_table WHERE id = '${id}' ${returnAll};`)
//   console.log(q)
//   return q
// }

// const testResolver = {
//   Query: {
//     test: () => getTestData()
//   },
//   Mutation: {
//     testLogin: (root, args) => login(root, args),
//     deleteTestUser: (root, args) => deleteUser(root, args)
//   }
// }

// export default testResolver