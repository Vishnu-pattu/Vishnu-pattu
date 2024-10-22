let tasks = [];

function login() {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('userDisplay').innerText = username;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    }
}

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;

    if (taskName) {
        tasks.push({ name: taskName, status: taskStatus });
        document.getElementById('taskName').value = '';
        renderTasks();
    }
}

function renderTasks() {
    const taskTable = document.getElementById('taskTable');
    taskTable.innerHTML = `
        <tr>
            <th>Task Name</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    `;
    
    tasks.forEach((task, index) => {
        const statusEmoji = getStatusEmoji(task.status);
        const row = taskTable.insertRow();
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.status} ${statusEmoji}</td>
            <td><button onclick="deleteTask(${index})">Delete</button></td>
        `;
    });
}

function getStatusEmoji(status) {
    switch (status) {
        case 'Pending':
            return '⏳'; // Hourglass emoji
        case 'In Progress':
            return '🔄'; // Repeat emoji
        case 'Completed':
            return '✅'; // Checkmark emoji
        default:
            return '';
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
