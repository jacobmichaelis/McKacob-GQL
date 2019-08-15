import { gql } from 'apollo-server-express'
import testType from './test-type'

const baseType = gql`
  type Query { base: String }
  type Mutation { base: String }
` // A base Query and Mutation are required to modularize types

const typeDefs = [ baseType, testType ]

export default typeDefs