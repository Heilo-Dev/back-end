const User = require("../model/User");
const UserWallate = require("../model/UserWallate");
const { google } = require("googleapis");

exports.getAllUserService = async (fields) => {
  return await User.find({}).sort({ role: fields });
};

exports.singup = async (data) => {
  const result = await User.create(data);
  let id = result._id.toString();
  // console.log(id)

  const creatWallate = await UserWallate.create({
    _id: id,
    email: result.email,
    role: result.role,
  });
  return { result, creatWallate };
};

exports.findUserByEmail = async (email) => {
  let result = await User.findOne({ email });
  return result;
};

exports.resetPassService = async (data) => {
  const { email, password } = data;
  return (result = await User.updateOne({ email }, { password: password }));
};

exports.passwordUpdate = async (id, data) => {
  console.log(id, data);
  const result = await User.updateOne(
    { _id: id },
    {
      $set: {
        password: data,
      },
    },
    { runValidators: true }
  );
  console.log(result);
  return result;
};

exports.googleLoginService = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  const options = {
    access_type: "online",
    scope: ["https://www.googleapis.com/auth/calendar"],
  };

  const authUrl = await oauth2Client.generateAuthUrl(options);

  console.log(authUrl, "url");
  return authUrl;
  // const result = {
  //   name: "name",
  //   email: "",
  //   role: "",
  //   phoneNumber: "",
  //   accessToken:
  // }
};
