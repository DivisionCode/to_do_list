const API_URL = "http://localhost:5000/api/tasks";

// Fetch and display tasks
async function getTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear list before updating

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `
            <span>${task.title} - ${task.completed ? "✅" : "❌"}</span>
            <button onclick="deleteTask('${task._id}')">🗑</button>
            <button onclick="toggleTask('${task._id}', ${task.completed})">✔</button>
        `;
        taskList.appendChild(li);
    });
}

// Add a new task
async function addTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    if (!title) {
        alert("Task title is required!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    getTasks();
}

// Toggle task completion
async function toggleTask(id, completed) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
    });

    getTasks();
}

// Delete a task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getTasks();
}

// Load tasks on page load
getTasks();
