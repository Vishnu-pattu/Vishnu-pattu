let currentUserId = null;

// Register a new user
async function registerUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill in both fields!");
    return;
  }

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error during registration:", errorData.message);
      alert("Failed to register: " + errorData.message);
      return;
    }

    const data = await response.json();
    currentUserId = data.id;
    document.getElementById("registration").style.display = "none";
    document.getElementById("feed").style.display = "block";
    loadFeed();
  } catch (error) {
    console.error("Failed to fetch:", error);
    alert(
      "Error: Failed to connect to the server. Please ensure the server is running and try again."
    );
  }
}

// Create a new post
async function createPost() {
  const content = document.getElementById("postContent").value;

  if (!content) {
    alert("Please enter some content before posting!");
    return;
  }

  try {
    const response = await fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, authorId: currentUserId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating post:", errorData.message);
      alert("Failed to create post: " + errorData.message);
      return;
    }

    document.getElementById("postContent").value = ""; // Clear the textarea after posting
    loadFeed();
  } catch (error) {
    console.error("Failed to fetch:", error);
    alert("Error: Failed to connect to the server. Please try again later.");
  }
}

// Load the feed
async function loadFeed() {
  try {
    const response = await fetch(`/api/posts/feed/${currentUserId}`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error loading feed:", errorData.message);
      alert("Failed to load feed: " + errorData.message);
      return;
    }

    const posts = await response.json();
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = ""; // Clear existing posts

    posts.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.className = "post";
      postDiv.innerHTML = `<strong>User ${post.authorId}:</strong> ${post.content}`;
      postsContainer.appendChild(postDiv);
    });
  } catch (error) {
    console.error("Failed to fetch:", error);
    alert("Error: Failed to connect to the server. Please try again later.");
  }
}

// Follow a user
async function followUser() {
  const followeeId = document.getElementById("followUserId").value;

  if (!followeeId) {
    alert("Please enter a User ID to follow!");
    return;
  }

  try {
    const response = await fetch("/api/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: currentUserId, followeeId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error following user:", errorData.message);
      alert("Failed to follow: " + errorData.message);
      return;
    }

    alert("Followed successfully");
    loadFeed(); // Refresh feed to show posts from new followee
  } catch (error) {
    console.error("Failed to fetch:", error);
    alert("Error: Failed to connect to the server. Please try again later.");
  }
}

// Unfollow a user
async function unfollowUser() {
  const followeeId = document.getElementById("followUserId").value;

  if (!followeeId) {
    alert("Please enter a User ID to unfollow!");
    return;
  }

  try {
    const response = await fetch("/api/unfollow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: currentUserId, followeeId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error unfollowing user:", errorData.message);
      alert("Failed to unfollow: " + errorData.message);
      return;
    }

    alert("Unfollowed successfully");
    loadFeed(); // Refresh feed to remove posts from unfollowed user
  } catch (error) {
    console.error("Failed to fetch:", error);
    alert("Error: Failed to connect to the server. Please try again later.");
  }
}
