const { Member } = require("../../models/member");

const Mutation = {
  createMember: async (_, { username, email, api_key }) => {
    const newMember = new Member({
      username,
      email,
      api_key,
      global_admin: false,
      approvedAppids: [],
      current_login_time: new Date().toISOString(),
      previous_login_time: null,
    });
    return await newMember.save();
  },

  deleteMember: async (_, { username }) => {
    const result = await Member.deleteOne({ username });
    return result.deletedCount > 0;
  }
};

module.exports = Mutation;
