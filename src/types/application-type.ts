import { gql } from 'apollo-server-express'

const applicationType = gql`
  type Application {
    tag: String
    name: String
    description: String
    url: String
    users: [User]
  }
`

export default applicationType