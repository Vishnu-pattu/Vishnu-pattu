document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value;

    if (todoText) {
        const li = document.createElement('li');
        li.textContent = todoText;

        // Create a date element
        const date = new Date().toLocaleString();
        const dateSpan = document.createElement('span');
        dateSpan.textContent = date;
        dateSpan.classList.add('date');

        li.appendChild(dateSpan);
        document.getElementById('todo-list').appendChild(li);
        
        todoInput.value = ''; // Clear the input
    }
});
