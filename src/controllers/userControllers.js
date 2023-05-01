import e from "express";
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

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const data = await fetch(finalUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await data.json();
  console.log(json);
  res.send(JSON.stringify(json));
  if ("access_token" in json) {
    const { access_token } = json;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    const emailData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    console.log(emailData);
  } else {
    return res.redirect("/login");
  }
};
export const deleteUser = (req, res) => res.send("Delete users");
export const getEdit = (req, res) => {
  return res.render("edit-profile", { pagetitle: "Edit Profile" });
};
export const postEdit = (req, res) => {
  return res.render("edit-profile", { pagetitle: "Edit Profile" });
};
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const see = (req, res) => res.send("See User");
