import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pagetitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, email, username, password, location } = req.body;
  await User.create({
    name,
    email,
    username,
    password,
    location,
  });
  console.log(req.body);
  return res.redirect("/login");
};
export const deleteUser = (req, res) => res.send("Delete users");
export const edit = (req, res) => res.send("Edit users");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
