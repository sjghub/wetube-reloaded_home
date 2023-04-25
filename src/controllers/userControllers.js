import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pagetitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, email, username, password1, password2, location } = req.body;
  if (password1 !== password2) {
    return res.render("join", {
      pagetitle: "Join",
      errormessage: "Password confirmation does not match",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.render("join", {
      pagetitle: "Join",
      errormessage: "username or email already exists",
    });
  }

  await User.create({
    name,
    email,
    username,
    password1,
    password2,
    location,
  });
  return res.redirect("/login");
};
export const deleteUser = (req, res) => res.send("Delete users");
export const edit = (req, res) => res.send("Edit users");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
