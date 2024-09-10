const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

const users = [];
const posts = [];

// Find a user by ID
function findUserById(userId) {
  return users.find((user) => user.id === userId);
}

// Register a new user
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const userId = `user_${Date.now()}`;
  const newUser = {
    id: userId,
    username,
    password,
    following: [],
  };

  users.push(newUser);
  res.json(newUser);
});

// Follow a user
app.post("/api/follow", (req, res) => {
  const { followerId, followeeId } = req.body;

  const follower = findUserById(followerId);
  const followee = findUserById(followeeId);

  if (!follower || !followee) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!follower.following.includes(followeeId)) {
    follower.following.push(followeeId);
  }

  res.json({ message: "Followed successfully" });
});

// Unfollow a user
app.post("/api/unfollow", (req, res) => {
  const { followerId, followeeId } = req.body;

  const follower = findUserById(followerId);
  const followee = findUserById(followeeId);

  if (!follower || !followee) {
    return res.status(404).json({ message: "User not found" });
  }

  follower.following = follower.following.filter((id) => id !== followeeId);

  res.json({ message: "Unfollowed successfully" });
});

// Create a new post
app.post("/api/posts/create", (req, res) => {
  const { content, authorId } = req.body;

  if (!content || !authorId) {
    return res
      .status(400)
      .json({ message: "Content and authorId are required" });
  }

  const newPost = {
    id: `post_${Date.now()}`,
    content,
    authorId,
    createdAt: new Date(),
  };

  posts.push(newPost);
  res.json(newPost);
});

// Get feed for a user
app.get("/api/posts/feed/:userId", (req, res) => {
  const { userId } = req.params;
  const user = findUserById(userId);

  if (user) {
    const userFeed = posts.filter(
      (post) =>
        user.following.includes(post.authorId) || post.authorId === userId
    );
    res.json(userFeed);
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
