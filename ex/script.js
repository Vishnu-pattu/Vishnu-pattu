document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('welcomeUser').textContent = username;
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('todoContainer').style.display = 'block';
    } else {
        alert('Please enter a username');
    }
});

document.getElementById('addTodoButton').addEventListener('click', function() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value;
    if (todoText) {
        const li = document.createElement('li');
        li.textContent = todoText;
        document.getElementById('todoList').appendChild(li);
        todoInput.value = ''; // Clear input field
    } else {
        alert('Please enter a to-do item');
    }
});
