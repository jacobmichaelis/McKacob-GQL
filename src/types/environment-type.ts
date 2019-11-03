import { gql } from 'apollo-server-express'

const environmentType = gql`
  type Environment {
    env: String
    description: String
    url: String
    users: [User]
  }
`

export default environmentType