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
  const videos = await Video.find({});
  console.log(videos);
  return res.render("home.pug", {
    pagetitle: "Home",
    videos,
  });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.render("watch.pug", {
      pagetitle: video.title,
      video,
    });
  }
  return res.render("404", { pagetitle: "Video not found" });
};

export const getEdit = async (req, res) => {
  {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.render("404", { pagetitle: "Video not found" });
    }
    return res.render("edit.pug", {
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
    return res.render("404", { pagetitle: "Video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags.split(",").map((word) => `#${word}`),
  });

  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload.pug");
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title: title,
      description: description,
      hashtags: Video.hashtagsForm(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pagetitle: "upload video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { title } = req.query;
  let videos = [];
  if (title) {
    videos = await Video.find({ title: { $regex: new RegExp(title, "i") } });
  }
  return res.render("search", { pagetitle: "Search ", videos });
};
