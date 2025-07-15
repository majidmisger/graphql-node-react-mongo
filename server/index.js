const express = require("express");
const app = express();
const PORT = 8000;
const { ApolloServer, gql } = require('apollo-server');



const { Member } = require("./models/member");
const { APPLICATION } = require("./models/applications");
const { EventSegments } = require("./models/eventssegments");


const resolvers = {

  Member: {
    approvedApps: async (parent) => {
      return await APPLICATION.find({ _id: { $in: parent.approvedAppids } });
    }
  },
  Query: {
    members: async () => { return await Member.find(); }, 
    member: async (_, { username }) => await Member.findOne({ username }),
    apps: async () => { return await APPLICATION.find(); }, 
    events: async () => { return await EventSegments.find(); }, 

  },
};

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
  clist: [String]  # Use [JSON] or [Mixed] with custom scalar if clist has complex structure
  events: [Event]
  updatedAt: Float
}

  type Member {
    username: String
    email: String
    api_key : String
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
    member(username: String!): Member,
    events :  [EventSegments]
  }
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});