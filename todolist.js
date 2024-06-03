document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    // Handle task actions (edit, delete, complete)
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            deleteTask(e.target.parentElement);
        } else if (e.target.classList.contains('edit')) {
            editTask(e.target.parentElement);
        } else if (e.target.classList.contains('complete')) {
            toggleComplete(e.target.parentElement);
        }
    });

    function addTask(task) {
        if (task === '') return;
        const li = document.createElement('li');
        li.innerHTML = `
            ${task}
            <button class="complete" > &#10003;</button>
            <button class="edit"> &#9998;</button>
            <button class="delete">&#10060;</button>
        `;
        taskList.appendChild(li);
        saveTasks();
    }

    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
        saveTasks();
    }

    function editTask(taskItem) {
        const newTask = prompt('Edit Task:', taskItem.firstChild.textContent.trim());
        if (newTask !== null && newTask !== '') {
            taskItem.firstChild.textContent = newTask;
            saveTasks();
        }
    }

    function toggleComplete(taskItem) {
        taskItem.classList.toggle('completed');
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            tasks.push({
                text: taskItem.firstChild.textContent.trim(),
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task.text}
                <button class="complete">&#10003;</button>
                <button class="edit">&#9998;</button>
                <button class="delete">&#10060;</button>
            `;
            if (task.completed) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);
        });
    }
});
