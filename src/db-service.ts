import { Application } from './entity/Application'
import { Environment } from './entity/Environment'
import { Role } from './entity/Role'

async function setupDB() {
  const testApplication = await Application.findOne({ tag: 'test' })
  const localEnvironment = await Environment.findOne({ env: 'local' })
  const userRole = await Role.findOne({ role: 'user' })
  const godRole = await Role.findOne({ role: 'god' })

  if (!testApplication) {
    let app = new Application()
    app.tag = 'test'
    app.name = 'Test App'
    app.description = 'Test App'
    app.save()
  }

  if (!localEnvironment) {
    let env = new Environment()
    env.env = 'local'
    env.description = 'Local Environment'
    env.url = 'http://localhost:534'
    env.save()
  }

  if (!userRole) {
    let user = new Role()
    user.role = 'user'
    user.description = 'Basic User Role'
    user.level = 0
    user.save()
  }

  if (!godRole) {
    let god = new Role()
    god.role = 'god'
    god.description = 'The Superest of Admins'
    god.level = 9001
    god.save()
  }
}

export { setupDB }
