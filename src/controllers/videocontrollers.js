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
  return res.render("home.pug", {
    pagetitle: "Home",
    videos: [],
  });
};
export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch.pug", {
    pagetitle: `Watching `,
  });
};
export const getEdit = (req, res) => {
  {
    const { id } = req.params;
    return res.render("edit.pug", {
      pagetitle: `Editing `,
    });
  }
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload.pug");
};
export const postUpload = (req, res) => {
  // here we will add a video to the videos array
  return res.redirect("/");
};
