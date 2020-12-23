import AuthModel from "../models/authModel.js";
import { SignUpValidation, SignInValidation } from "../validations/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const GetRegisteredUser = async (req, res) => {
  const id = req.user;
  try {
    const { name, email } = await AuthModel.findById(id);
    res.status(201).json({ name: name, email: email });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const SignUp = async (req, res) => {
  const userdata = req.body;

  const { error } = SignUpValidation(userdata);
  if (error) return res.status(400).json({ status: false, message: error.details[0].message });

  const emailExist = await AuthModel.findOne({ email: userdata.email });
  if (emailExist) return res.status(401).json({ status: false, message: "Email already exists" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userdata.password, salt);

  const create_user = new AuthModel({
    name: userdata.name,
    email: userdata.email,
    password: hashedPassword,
  });
  try {
    const savedUserdata = await create_user.save();
    const token = jwt.sign({ _id: savedUserdata._id }, process.env.TOKEN_SECRET);
    res.status(200).json({ status: true, message: "Successfully created account", token: token });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const SignIn = async (req, res) => {
  const userdata = req.body;

  try {
    const { error } = SignInValidation(userdata);
    if (error) return res.status(400).json({ status: false, message: error.details[0].message });

    const dbUser = await AuthModel.findOne({ email: userdata.email });
    if (!dbUser) return res.status(400).json({ status: false, message: "Invalid Email" });

    const validPassword = bcrypt.compareSync(userdata.password, dbUser.password);
    if (!validPassword) return res.status(400).json({ status: false, message: "Invalid Password" });

    const token = jwt.sign({ _id: dbUser._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).json({ status: true, message: "Successfully Logged-In", token: token });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};
