import User from "../models/User";
import Video from "../models/Video";

/*

// Video.find({}, (error, videos) => {
//   console.log("start");   1번째 
//   if (error) {
  //     return res.render("server-error");
  //   }
  //   return res.render("home", { pagetitle: "Home", videos });
  // });    3번째
  //   console.log("finished");  2번째
*/

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home.pug", {
    pagetitle: "Home",
    videos,
  });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  console.log(video);
  if (video) {
    return res.render("videos/watch.pug", {
      pagetitle: video.title,
      video,
    });
  }
  return res.status(404).render("404", { pagetitle: "Video not found" });
};

export const getEdit = async (req, res) => {
  {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).render("404", { pagetitle: "Video not found" });
    }
    if (String(video.onwer) !== String(req.session._id)) {
      return res.status(403).redirect("/");
    }
    return res.render("videos/edit.pug", {
      pagetitle: `Editing ${video.title}`,
      video,
    });
  }
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pagetitle: "Video not found" });
  }
  if (String(video.onwer) !== String(req.session._id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags.split(",").map((word) => `#${word}`),
  });

  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("videos/upload");
};
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const file = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title: title,
      description: description,
      fileUrl: file.path,
      owner: _id,
      hashtags: Video.hashtagsForm(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("videos/upload", {
      pagetitle: "upload video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  const user = await User.findById(_id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video");
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};
