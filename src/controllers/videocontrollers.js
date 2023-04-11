const fakeUser = {
  username: "sungjoon",
  loggedIn: true,
};

export const trending = (req, res) => {
  const videos = [
    { title: "video #1", rating: 5, comments: 2, creatAd: "2 minuts ago" },
    { title: "video #2", rating: 5, comments: 2, creatAd: "2 minuts ago" },
    { title: "video #3", rating: 5, comments: 2, creatAd: "2 minuts ago" },
  ];
  return res.render("home.pug", {
    pagetitle: "Home",
    fakeUser: fakeUser,
    videos,
  });
};
export const watch = (req, res) =>
  res.render("watch.pug", { pagetitle: "Watch" });
export const edit = (req, res) => res.render("edit.pug", { pagetitle: "Edit" });
export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("Upload Video");
