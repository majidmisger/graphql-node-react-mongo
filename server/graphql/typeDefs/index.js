const { gql } = require("apollo-server");

const typeDefs = gql`
  type EventParam {
    name: String
    type: String
  }

  type Event {
    event: String
    displayname: String
    clientname: String
    list: [EventParam]
    isDisplay: Boolean
    journey: String
  }

  type EventSegments {
    clist: [String]
    events: [Event]
    updatedAt: Float
  }

  type Member {
    username: String
    email: String
    api_key: String
    global_admin: Boolean
    approvedAppids: [String]
    current_login_time: String
    previous_login_time: String
    approvedApps: [Application]
  }

  type Application {
    name: String
    category: String
    icon: String
    email_auth: String
  }

  type Query {
    members: [Member]
    apps: [Application]
    member(username: String!): Member
    events: [EventSegments]
  }
`;

module.exports = typeDefs;
