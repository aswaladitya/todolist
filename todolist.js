document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tbody = document.querySelector('#taskTable tbody');
    tbody.innerHTML = '';
    tasks.forEach((task, index) => {
        const row = tbody.insertRow();
        const cell0 = row.insertCell(0);
        const cell1 = row.insertCell(1);
        const cell2 = row.insertCell(2);
        const cell3 = row.insertCell(3);
        const cell4 = row.insertCell(4);
        cell0.textContent = index + 1;
        cell1.textContent = task.name;
        cell2.textContent = task.description;
        cell3.textContent = task.dueDate;
        cell4.innerHTML = `
            <button onclick="showForm('edit', ${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
    });
}

function showForm(action, index = null) {
    const modal = document.getElementById('taskModal');
    const title = document.getElementById('modalTitle');
    modal.style.display = 'flex';
    
    document.getElementById('taskIndex').value = index;
    
    if (action === 'edit' && index !== null) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks[index];
        document.getElementById('taskName').value = task.name;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskDueDate').value = task.dueDate;
        title.textContent = 'Edit Task';
    } else {
        document.getElementById('taskName').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskDueDate').value = '';
        title.textContent = 'Add Task';
    }
}

function hideForm() {
    const modal = document.getElementById('taskModal');
    modal.style.display = 'none';
}

function submitForm() {
    const index = document.getElementById('taskIndex').value;
    const name = document.getElementById('taskName').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDueDate').value;
    
    if (name && description && dueDate) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (index) {
            tasks[index] = { name, description, dueDate };
        } else {
            tasks.push({ name, description, dueDate });
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
        hideForm();
    }
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}
