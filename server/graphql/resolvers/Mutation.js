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
  },

  updateMember: async (_, { username, email, api_key, approvedAppids }) => {
    const updates = {};

    if (email !== undefined) updates.email = email;
    if (api_key !== undefined) updates.api_key = api_key;
    if (approvedAppids !== undefined) updates.approvedAppids = approvedAppids;

    const updated = await Member.findOneAndUpdate(
      { username },
      { $set: updates },
      { new: true }
    );

    return updated;
  }
};

module.exports = Mutation;
