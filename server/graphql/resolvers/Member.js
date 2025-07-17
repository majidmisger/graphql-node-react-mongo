const { APPLICATION } = require("../../models/applications");

const Member = {
  approvedApps: async (parent) => {
    return await APPLICATION.find({ _id: { $in: parent.approvedAppids } });
  }
};

module.exports = Member;
