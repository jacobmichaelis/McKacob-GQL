import { gql } from 'apollo-server-express'
import testType from './test-type'
import userType from './user-type'
import applicationType from './application-type'
import environmentType from './environment-type'
import roleType from './role-type'

const baseType = gql`
  type Query { base: String }
  type Mutation { base: String }
` // A base Query and Mutation are required to modularize types

const typeDefs = [ baseType, testType, applicationType, environmentType, roleType, userType ]

export default typeDefs