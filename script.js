const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.onload = function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

// Add task
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTaskToDOM(taskText);
        saveTask(taskText, false);
        taskInput.value = '';
    }
});

// Allow Enter key to add task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});

// Function to create task in DOM
function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');
    li.textContent = text;
    if (completed) li.classList.add('completed');

    // Toggle complete on click
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateTask(text, li.classList.contains('completed'));
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        taskList.removeChild(li);
        deleteTask(text);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task status in localStorage
function updateTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.text === text);
    if (task) task.completed = completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTask(text) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.text !== text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
