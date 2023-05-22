const client = require("../db/index");

const signup = async (req, res, next) => {
  const {
    candidateName,
    adharNumber,
    sex,
    age,
    dob,
    mobileNumber,
    address,
    state,
    city,
    fid,
  } = req.body;
  let createdres;
  try {
    createdres = await client.query(
      `INSERT INTO users(candidateName,adharNumber,sex,age,dob,mobileNumber,address,state,city,fid ) values($1,$2,$3,$4,$5,$6,$7,$8,$9 ,$10) RETURNING adharNUmber`,
      [
        candidateName,
        adharNumber,
        sex,
        age,
        dob,
        mobileNumber,
        address,
        state,
        city,
        fid,
      ]
    );
  } catch (err) {
    return res.status(500).json({ message: "Failed to signup" });
  }

  return res.status(200).json({
    message: "signup successfull",
    adharNumber: createdres.rows[0].adharNumber,
  });
};

const getRegisteredUsers = async (req, res, next) => {
  console.log("hello registered");
  let registeredUsers;
  try {
    registeredUsers = await client.query("SELECT COUNT(*) FROM users");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch registered users" });
  }

  return res.status(200).json({ count: registeredUsers.rows[0].count });
};

const updateFingerPrint = async (req, res) => {
  const { fId, adharNumber } = req.body;
  try {
    await client.query("update users set fid=$1 where adharNumber=$2", [
      fId,
      adharNumber,
    ]);
    return res
      .status(200)
      .json({ message: "Finger print updated successfully" });
  } catch (_error) {
    console.error(_error);
    return res
      .status(500)
      .json({ message: "Failed to update the finger print id" });
  }
};

const getfingerprintId = async (req, res) => {
  try {
    let user = await client.query(
      "SELECT fid FROM users where fid IS NOT NULL ORDER BY created_at DESC LIMIT 1"
    );
    return res.status(200).json({ fid: user.rows[0].fid });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch registered users id" });
  }
};

const vote = async (req, res, next) => {
  const { fid, partyId } = req.body;

  try {
    await client.query(
      "UPDATE users set isvoted=true , partyId= $2 WHERE fid=$1 ",
      [fid, partyId]
    );
  } catch (err) {
    return res.status(500).json({ message: "Failed to vote" });
  }

  return res
    .status(200)
    .json({ message: "Voted successfully", fid: fid, party: partyId });
};

const getVotesCasted = async (req, res, next) => {
  let totalVotes;
  try {
    totalVotes = await client.query(
      "SELECT COUNT(*) FROM users where isvoted=true"
    );
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch vote count" });
  }
  return res.status(200).json({ count: totalVotes.rows[0].count });
};

const getRecentRegistrations = async (req, res, next) => {
  // console.log("RECENT");
  let recentregistration;

  try {
    recentregistration = await client.query(
      "SELECT * FROM users ORDER BY created_at DESC LIMIT 3 "
    );
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch registrations" });
  }
  return res.status(200).json({ data: recentregistration.rows });
};

module.exports = {
  signup,
  getRegisteredUsers,
  getfingerprintId,
  vote,
  getVotesCasted,
  getRecentRegistrations,
  updateFingerPrint,
};
