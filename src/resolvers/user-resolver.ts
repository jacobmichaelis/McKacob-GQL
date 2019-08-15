// import { queryOne, queryMany } from '../db/db-config'
// import * as authConfig from '../db/db-credentials.json'
// import * as jwt from 'jsonwebtoken'

// const returnOne = 'RETURNING id, email, encrypted, first_name, last_name, phone, street, city, state, zip, app, env, role'
// const returnAll = 'RETURNING *'

// function getAll() {
//   let result = queryMany('SELECT * FROM 'user';')
//   result.then((users) => {
//     users.forEach((user) => {
//       user.encrypted = undefined
//     })
//   })
//   return result
// }

// function authorize(token) {
//   if (!token) return false
//   try {
//     const decoded = jwt.verify(token, authConfig.secret)
//     const email = decoded.email
//     const user = byEmail(email)
//     if (user)
//       return { authorized: true, role: user.role }
//     else
//       return { authorized: false }
//   } catch (err) {
//     // TODO
//     return { authorized: false }
//   }
// }

// function authenticate(root, args) {
//   let email = args.email
//   let password = args.password
//   console.log('Enter authenticate')
//   console.log('Email: ' + email + ' Password: ' + password)
//   if (!email || !password) return null
//   let result = queryOne(`SELECT * FROM 'user' WHERE email = '${email}' AND encrypted = crypt('${password}', encrypted);`)
//   console.log(result)
//   result.then((user) => {
//     user.encrypted = undefined
//     user.token = generateToken(user.email, user.firstName, user.lastName, user.role)
//     return user
//   })
//   return result
// }

// function register(root, args) {
//   let id = args.id // TODO
//   let email = args.email
//   let password = args.password
//   let firstName = args.first_name
//   let lastName = args.last_name
//   let phone = (args.phone) ? args.phone : null
//   let street = (args.street) ? args.street : null
//   let city = (args.city) ? args.city : null
//   let state = (args.state) ? args.state : null
//   let zip = (args.zip) ? args.zip : null
//   let env = (args.env) ? args.env : null
//   let app = args.app
//   let role = args.role
//   if (email && password && firstName && lastName) {
//     let result = queryOne(`INSERT INTO 'user'(email, encrypted, first_name, last_name, phone, street, city, state, zip, env, app, role) `
//       + `VALUES ('${email}', crypt('${password}', gen_salt('bf', 8)), '${firstName}', '${lastName}', `
//       +`'${phone}', '${street}', '${city}', '${state}', '${zip}', '${env}', '${app}', '${role}') `
//       +`${returnOne};`)
//     result.then((user) => {
//       user.encrypted = undefined
//       user.token = generateToken(email, firstName, lastName, role)
//       return user
//     })

//     return result
//   } else return null
// }

// function deleteOne(root, args, context) {
//   if (context.authorized && context.role)
//     return queryOne(`DELETE FROM 'user' WHERE id = '${args.id}' ${returnOne};`)
// }

// function deleteAll(root, args, context) {
//   return queryMany(`DELETE FROM 'user' WHERE role = 'user' ${returnAll};`)
// }

// function byEmail(email) {
//   return queryOne(`SELECT * FROM 'user' WHERE email = ${email}`)
// }

// function generateToken(email, firstName, lastName, role) {
//   return jwt.sign({ email, firstName, lastName, role }, authConfig.secret, { algorithm: 'HS512' })
// }

// const userResolver = {
//   Query: {
//     users: () => getAll()
//   },
//   Mutation: {
//     loginUser: (root, args) => authenticate(root, args),
//     registerUser: (root, args) => register(root, args),
//     deleteOneUser: (root, args, context) => deleteOne(root, args, context),
//     deleteAllUsers: (root, args, context) => deleteAll(root, args, context)
//   }
// }

// export { userResolver, authorize }