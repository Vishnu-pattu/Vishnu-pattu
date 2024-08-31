document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Function to create a new to-do item
    function createTodoItem(text) {
        const li = document.createElement('li');
        li.textContent = text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const todoText = input.value.trim();
        if (todoText) {
            createTodoItem(todoText);
            input.value = '';
        }
    });
});
