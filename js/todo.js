const addTaskForm = document.getElementById("addTaskForm");
const tasksTableBody = document.getElementById("tasksTable")?.querySelector("tbody");
const successMessage = document.getElementById("successMessage");

// Initialize tasksData from storage
if(!window.tasksData) window.tasksData = JSON.parse(localStorage.getItem("tasksData") || "[]");

addTaskForm.addEventListener("submit", function(e){
  e.preventDefault();
  const newTask = {
    name: document.getElementById("taskName").value.trim(),
    deadline: document.getElementById("taskDeadline").value,
    status: "Pending"
  };

  window.tasksData.push(newTask);
  localStorage.setItem("tasksData", JSON.stringify(window.tasksData));
  successMessage.textContent = "Task added successfully!";
  addTaskForm.reset();
  renderTasks();
  checkTaskNotifications();
  setTimeout(()=>{ successMessage.textContent = ""; },3000);
});

function renderTasks(){
  if(!tasksTableBody) return;
  tasksTableBody.innerHTML = "";
  window.tasksData.forEach((task,index)=>{
    const taskDate = new Date(task.deadline);
    const now = new Date();
    const status = taskDate < now ? "Completed" : "Pending";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${task.name}</td>
      <td>${taskDate.toLocaleString()}</td>
      <td>${status}</td>
      <td>
        <button class="action-btn" onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    tasksTableBody.appendChild(tr);
  });
}

function deleteTask(index){
  if(confirm("Delete this task?")){
    window.tasksData.splice(index,1);
    localStorage.setItem("tasksData", JSON.stringify(window.tasksData));
    renderTasks();
  }
}

// Check notifications (tasks within next 30 minutes)
function checkTaskNotifications(){
  const now = new Date();
  const notifications = window.tasksData.filter(task=>{
    const taskTime = new Date(task.deadline);
    const diff = (taskTime - now)/60000; // minutes
    return diff <= 30 && diff > 0;
  });
  if(notifications.length > 0){
    alert(`You have ${notifications.length} task(s) due within the next 30 minutes!`);
  }
}

// Auto-check every 1 minute
setInterval(checkTaskNotifications,60000);

// Initial render
renderTasks();
checkTaskNotifications();
