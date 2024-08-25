import axios from "axios";
import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.status(200).json({
    message: "This is form backend",
    success: true,
  });
});

app.get("/posts", async (req, res) => {
  const { userId } = req.query;
  try {
    let fetchPosts = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (!fetchPosts)
      return res
        .status(401)
        .json({ message: "Something wants wrong", success: true });
    if (userId) {
      const posts = fetchPosts.data.filter((post) => post.userId == userId);
      return res.status(201).json(posts);
    } else {
      return res.status(201).json(fetchPosts.data);
    }
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(3500, () => {
  console.log("Server run on this port : 3500");
});
