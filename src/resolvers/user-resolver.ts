import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { SECRET } from '../db-config'

import { User } from '../entity/User'

async function getAll() {
  return await User.find().then(users => users.forEach(user => user.encrypted = undefined))
}

function authorize(token) {
  if (!token) return false
  try {
    const decoded = jwt.verify(token, SECRET)
    const email = decoded.email
    const user = byEmail(email)
    if (user)
      return { authorized: true, role: user.role }
    else
      return { authorized: false }
  } catch (err) {
    // TODO
    return { authorized: false }
  }
}

function authenticate(root, args) {
  let email = args.email
  let password = args.password
  console.log('Enter authenticate')
  console.log('Email: ' + email + ' Password: ' + password)
  if (!email || !password) return null
  let result = queryOne(`SELECT * FROM 'user' WHERE email = '${email}' AND encrypted = crypt('${password}', encrypted);`)
  console.log(result)
  result.then((user) => {
    user.encrypted = undefined
    user.token = generateToken(user.email, user.firstName, user.lastName, user.role)
    return user
  })
  return result
}

async function register(root, args) {
  let user = new User()
  if (args.id) user.id = args.id
  user.email = args.email
  bcrypt.hash(args.password, 17, (err, hash) => user.encrypted = hash)
  user.firstName = args.firstName
  user.lastName = args.lastName
  user.phone = args.phone || null
  user.street = args.street || null
  user.city = args.city || null
  user.state = args.state || null
  user.zip = args.zip || null
  if (args.env) user.env = args.env
  user.app = args.app
  user.role = args.role
  try {
    await user.save()
    user.encrypted = undefined
    return user
  } catch(e) {
    console.error(e)
    return e
  }
}

async function deleteOne(root, args, context) {
  if (context.authorized && context.role.level > 0) {
    let user = await User.findOne({ id: args.id })
    user.remove()
    return user
  } else return null
}

async function deleteAll(root, args, context) {
  if (context.authorized && context.role.level > 0) {
    let users = await User.find({ role: 'test' })
  } else return null
}

function byEmail(email) {
  return queryOne(`SELECT * FROM 'user' WHERE email = ${email}`)
}

function generateToken(email, firstName, lastName, role) {
  return jwt.sign({ email, firstName, lastName, role }, authConfig.secret, { algorithm: 'HS512' })
}

const userResolver = {
  Query: {
    users: () => getAll()
  },
  Mutation: {
    loginUser: (root, args) => authenticate(root, args),
    registerUser: (root, args) => register(root, args),
    deleteOneUser: (root, args, context) => deleteOne(root, args, context),
    deleteAllUsers: (root, args, context) => deleteAll(root, args, context)
  }
}

export { userResolver, authorize }