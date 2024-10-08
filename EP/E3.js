
const postForm = document.getElementById('post-form');
const postContent = document.getElementById('post-content');
const postsContainer = document.getElementById('posts-container');
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const postContainer = document.getElementById('post-container');
const fileInput = document.getElementById('file-input');
const statsContainer = document.getElementById('stats-container');

let posts = JSON.parse(localStorage.getItem('posts')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let followers = JSON.parse(localStorage.getItem('followers')) || {}; // Track followers for each user
let currentUser = null;

// Function to display posts
function displayPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <p><strong>${post.username}</strong>: ${post.content} ${post.file ? `<br><a href="${post.file}" target="_blank">View attachment</a>` : ''}</p>
            <p><small>${post.date}</small></p>
            <p>👍 Likes: ${post.likes} | 👎 Dislikes: ${post.dislikes}</p>
            <button class="like" onclick="likePost(${index})">👍 Like</button>
            <button class="dislike" onclick="dislikePost(${index})">👎 Dislike</button>
            <input type="text" class="comment-input" id="comment-input-${index}" placeholder="Add a comment with emojis 😊">
            <button onclick="addComment(${index})">💬 Comment</button>
            <div>
                <strong>Comments:</strong>
                <ul>${post.comments.map((comment, commentIndex) => `
                    <li>${comment.content} - <small>by ${comment.username}</small>
                        <button class="comment-like" onclick="likeComment(${index}, ${commentIndex})">👍</button>
                        <button class="comment-dislike" onclick="dislikeComment(${index}, ${commentIndex})">👎</button>
                    </li>`).join('')}
                </ul>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
    updateStats();
}

// Update overall stats
function updateStats() {
    let totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
    let totalDislikes = posts.reduce((sum, post) => sum + post.dislikes, 0);
    let totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0);

    statsContainer.innerHTML = `
        <h3>Platform Statistics:</h3>
        <p>Total Posts: ${posts.length}</p>
        <p>Total Likes: ${totalLikes}</p>
        <p>Total Dislikes: ${totalDislikes}</p>
        <p>Total Comments: ${totalComments}</p>
    `;
}

// Handle login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;

    if (username) {
        currentUser = username;
        if (!users.includes(username)) {
            users.push(username);
            localStorage.setItem('users', JSON.stringify(users));
        }
        if (!followers[username]) followers[username] = [];
        localStorage.setItem('followers', JSON.stringify(followers));

        alert(`Login successful! Welcome, ${username}!`);
        loginContainer.style.display = 'none';
        postContainer.style.display = 'block';
    } else {
        alert('Please enter a username.');
    }
});

// Handle post submission
postForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const content = postContent.value;
    const file = fileInput.files[0];
    const fileURL = file ? URL.createObjectURL(file) : null;

    const newPost = {
        username: currentUser,
        content: content + ' 😊',
        file: fileURL,
        likes: 0,
        dislikes: 0,
        comments: [],
        date: new Date().toLocaleString()
    };

    posts.push(newPost);
    postContent.value = '';
    fileInput.value = '';
    savePosts();
    displayPosts();
});

// Like a post
function likePost(index) {
    posts[index].likes++;
    savePosts();
    displayPosts();
}

// Dislike a post
function dislikePost(index) {
    posts[index].dislikes++;
    savePosts();
    displayPosts();
}

// Add a comment
function addComment(index) {
    const commentInput = document.getElementById(`comment-input-${index}`);
    const comment = commentInput.value;
    if (comment) {
        posts[index].comments.push({ content: comment + ' 😊', username: currentUser });
        commentInput.value = '';
        savePosts();
        displayPosts();
    }
}

// Like/dislike a comment
function likeComment(postIndex, commentIndex) {
    alert(`Liked comment on post ${postIndex + 1}!`);
}

function dislikeComment(postIndex, commentIndex) {
    alert(`Disliked comment on post ${postIndex + 1}!`);
}

// Follow/unfollow a user
function followUser(username) {
    if (!followers[username].includes(currentUser)) {
        followers[username].push(currentUser);
        alert(`You are now following ${username}`);
    } else {
        alert(`You are already following ${username}`);
    }
    localStorage.setItem('followers', JSON.stringify(followers));
}

function unfollowUser(username) {
    followers[username] = followers[username].filter(follower => follower !== currentUser);
    alert(`You have unfollowed ${username}`);
    localStorage.setItem('followers', JSON.stringify(followers));
}

// Save posts and users to localStorage
function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Initial display of posts
displayPosts();
