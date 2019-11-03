import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { SECRET } from '../db-config'

import { User } from '../entity/User'
import { Environment } from '../entity/Environment'
import { Application } from '../entity/Application'
import { Role } from '../entity/Role'

function handleError(err) {
  console.error(err)
  return { err }
}

async function getAll() {
  let users = await User.find({ relations: ['app', 'env', 'role']})
  console.log(users[0].app)
  console.log(users)
  return users
}

async function authorize(token) {
  if (!token) return false
  try {
    const decoded = jwt.verify(token, SECRET)
    const email = decoded.email
    const user = await byEmail(email)
    if (user)
      return { authorized: true, role: user.role }
    else
      return { authorized: false }
  } catch (err) {
    // TODO
    return { authorized: false }
  }
}

async function authenticate(root, args) {
  let email = args.email
  let password = args.password
  console.log('Enter authenticate')
  console.log('Email: ' + email + ' Password: ' + password)
  if (!email || !password) return null
  let user = await User.findOne({ email: email })
  if (!user) return null
  bcrypt.compare(password, args.password).then(isMatch => {
    if (isMatch) {
      return generateToken(email, user.firstName, user.lastName, user.role)
    } else return null
  })
  return null
}

async function register(root, args) {
  let user = new User()
  if (args.id) user.id = args.id
  user.email = args.email
  user.password = args.password
  user.firstName = args.firstName
  user.lastName = args.lastName
  user.phone = args.phone || null
  user.street = args.street || null
  user.city = args.city || null
  user.state = args.state || null
  user.zip = args.zip || null
  user.env = await Environment.findOne({ env: args.env })
  user.app = await Application.findOne({ tag: args.app })
  user.role = await Role.findOne({ role: args.role })
  try {
    await user.save()
    return user
  } catch(e) {
    return handleError(e)
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
  if (context.authorized && context.role.level > 9000) { // It's over 9000!!!
    let users = await User.find({ role:  { role: 'user' } })
    users.forEach((user) => user.remove())
    return users
  } else return null
}

async function byEmail(email) {
  return await User.findOne({ email: email })
}

function generateToken(email, firstName, lastName, role) {
  return jwt.sign({ email, firstName, lastName, role }, SECRET, { algorithm: 'HS512' })
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