import AuthModel from "../models/authModel.js";
import { SignUpValidation, SignInValidation } from "../validations/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
  const userdata = req.body;

  const { error } = SignUpValidation(userdata);
  if (error) return res.status(400).json({ status: "ERROR", message: error.details[0].message });

  const emailExist = await AuthModel.findOne({ email: userdata.email });
  if (emailExist) return res.status(401).json({ status: "ERROR", message: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userdata.password, salt);

  const create_user = new AuthModel({
    name: userdata.name,
    email: userdata.email,
    password: hashedPassword,
  });
  try {
    const savedUserdata = await create_user.save();
    res.status(200).json({ status: "SUCCESS", message: "Successfully created account" });
  } catch (error) {
    res.status(400).json({ status: "ERROR", message: error.message });
  }
};

export const SignIn = async (req, res) => {
  const userdata = req.body;

  try {
    const { error } = SignInValidation(userdata);
    console.log(error);
    if (error) return res.status(400).json({ status: "ERROR", message: error.details[0].message });

    const dbUser = await AuthModel.findOne({ email: userdata.email });
    if (!dbUser) return res.status(400).json({ status: "ERROR", message: "Invalid Email" });

    const validPassword = bcrypt.compareSync(userdata.password, dbUser.password);
    if (!validPassword) return res.status(400).json({ status: "ERROR", message: "Invalid Password" });

    const token = jwt.sign({ _id: dbUser._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).json({ status: "SUCCESS", message: "Successfully Logged-In" });
  } catch (error) {
    res.status(404).json({ status: "ERROR", message: error.message });
  }
};
