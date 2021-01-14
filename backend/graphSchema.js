const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    getAContact(_id: String!): Contact
    getAllContacts: [Contact]
    search(feed: String!): [Contact]
  }

  type Mutation {
    deleteContact(_id: String!): String
    updateContact(
      _id: String!,
      name: String,
      address: String,
      phone: String,
      email: String
    ): Contact
  }

  type Contact {
    _id: String
    name: String
    address: String
    phone: String
    email: String
  }
`);

module.exports = schema;
