let videos = [
  {
    title: "video #1",
    views: 1,
    rating: 5,
    comments: 2,
    creatAd: "1 minuts ago",
    id: 1,
  },
  {
    title: "video #2",
    views: 32,
    rating: 4,
    comments: 2,
    creatAd: "2 minuts ago",
    id: 2,
  },
  {
    title: "video #3",
    views: 0,
    rating: 5,
    comments: 2,
    creatAd: "3 minuts ago",
    id: 3,
  },
];
export const trending = (req, res) => {
  return res.render("home.pug", {
    pagetitle: "Home",
    videos,
  });
};
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch.pug", {
    pagetitle: `Watching ${video.title}`,
    video,
  });
};
export const getEdit = (req, res) => {
  {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("edit.pug", {
      pagetitle: `Editing ${video.title}`,
      video,
    });
  }
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
