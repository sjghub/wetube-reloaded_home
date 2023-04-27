import User from "../models/User";
import bycrpt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pagetitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pagetitle: "Join",
      errormessage: "Password confirmation does not match",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pagetitle: "Join",
      errormessage: "username or email already exists",
    });
  }

  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.status(400).render("join", {
      pagetitle: "Join",
      errormessage: error._message,
    });
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pagetitle: "Log In" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pagetitle: "Log In",
      errormessage: "An account with this username does not exists",
    });
  }
  const ok = await bycrpt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pagetitle: "Log In",
      errormessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};
export const deleteUser = (req, res) => res.send("Delete users");
export const edit = (req, res) => res.send("Edit users");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
