const { Member } = require("../../models/member");
const { APPLICATION } = require("../../models/applications");
const { EventSegments } = require("../../models/eventssegments");

const Query = {
  members: async () => await Member.find(),
  member: async (_, { username }) => await Member.findOne({ username }),
  apps: async () => await APPLICATION.find(),
  events: async () => await EventSegments.find()
};

module.exports = Query;
