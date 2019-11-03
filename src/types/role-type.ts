import { gql } from 'apollo-server-express'

const roleType = gql`
  type Role {
    role: String
    description: String
    level: Int
    users: [User]
  }
`

export default roleType