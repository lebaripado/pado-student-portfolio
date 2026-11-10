/* =========================================================
   planner.js — the Academic Planner page

   THE ONE BIG IDEA:
   All tasks live in ONE array called "tasks".
   Every time something changes (add, complete, delete),
     1. we update the array, then
     2. we call showTasks() to redraw the list from the array.
   The array is the "truth"; the page is just a picture of it.

   Each task is an object like this:
   { id: 1731234567890, title: "Revise COS 106", course: "COS 106",
     due: "2026-11-20", priority: "high", done: false }
   ========================================================= */


// ---------- 1. Grab the elements we need ----------
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const courseInput = document.getElementById("task-course");
const dateInput = document.getElementById("task-date");
const priorityInput = document.getElementById("task-priority");
const taskError = document.getElementById("task-error");

const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const clearDoneButton = document.getElementById("clear-done");
const showButtons = document.querySelectorAll("[data-show]");

const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");


// ---------- 2. The data ----------

// Which tasks to show: "all", "active" (not done) or "done"
let currentView = "all";

// Starter tasks for a first-time visitor: my real exam timetable + this project
const starterTasks = [
  { id: 1, title: "Build COS 106 portfolio website", course: "CSC 106", due: "2026-11-20", priority: "high", done: true },
  { id: 2, title: "Write the COS 106 project report (PDF)", course: "CSC 106", due: "2026-11-27", priority: "high", done: false },
  { id: 3, title: "Submit hosted link and GitHub repo", course: "CSC 106", due: "2026-11-30", priority: "high", done: false },
  { id: 4, title: "Exam: COS 102 Problem Solving", course: "COS 102", due: "2026-12-08", priority: "medium", done: false },
  { id: 5, title: "Exam: GST 122 Communication in English II", course: "GST 122", due: "2026-12-08", priority: "medium", done: false },
  { id: 6, title: "Exam: PHY 102 General Physics II", course: "PHY 102", due: "2026-12-10", priority: "medium", done: false },
  { id: 7, title: "Exam: CSC 106 Introduction to Web Technologies", course: "CSC 106", due: "2026-12-10", priority: "medium", done: false },
  { id: 8, title: "Exam: MTH 102 Elementary Mathematics II", course: "MTH 102", due: "2026-12-11", priority: "medium", done: false },
  { id: 9, title: "Exam: PHY 108 General Practical Physics II", course: "PHY 108", due: "2026-12-11", priority: "medium", done: false },
  { id: 10, title: "Exam: GST 112 Nigerian Peoples and Culture", course: "GST 112", due: "2026-12-12", priority: "medium", done: false }
];

// Load saved tasks (or use the starter tasks)
let tasks = loadTasks();


// ---------- 3. Saving and loading (localStorage) ----------

// localStorage is a small storage box inside the browser.
// It only stores text, so we convert the array to text with JSON.stringify
function saveTasks() {
  localStorage.setItem("lp-planner-v2", JSON.stringify(tasks));
}

// ...and convert the text back into an array with JSON.parse
function loadTasks() {
  const saved = localStorage.getItem("lp-planner-v2");
  if (saved === null) {
    return starterTasks; // nothing saved yet
  }
  return JSON.parse(saved);
}


// ---------- 4. Small helper functions ----------

// Turn "2026-11-20" into "20 Nov 2026"
function formatDate(dateText) {
  if (dateText === "") {
    return "No due date";
  }
  const date = new Date(dateText + "T00:00:00");
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// Is the task past its due date (and not done yet)?
function isOverdue(task) {
  if (task.due === "" || task.done) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(task.due + "T00:00:00") < today;
}


// ---------- 5. Drawing the list: showTasks() ----------

function showTasks() {
  taskList.innerHTML = ""; // clear the list, then rebuild it
  let visibleCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    // Skip tasks that don't belong in the current view
    if (currentView === "active" && task.done) { continue; }
    if (currentView === "done" && !task.done) { continue; }

    // Create the <li> for this task
    const item = document.createElement("li");
    item.className = "task-item priority-" + task.priority;
    if (task.done) { item.classList.add("done"); }
    if (isOverdue(task)) { item.classList.add("overdue"); }

    // Checkbox: marks the task complete
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark '" + task.title + "' as done");
    checkbox.addEventListener("change", function () {
      toggleTask(task.id);
    });

    // Text: title + course, due date and priority
    const text = document.createElement("div");
    let dueLabel = formatDate(task.due);
    if (isOverdue(task)) { dueLabel = "Overdue: " + dueLabel; }
    text.innerHTML =
      '<p class="task-title"></p>' +
      '<div class="task-meta">' +
        "<span>" + (task.course || "General") + "</span>" +
        '<span class="task-due">' + dueLabel + "</span>" +
        "<span>" + task.priority + " priority</span>" +
      "</div>";
    // textContent (not innerHTML) for the title, so typed text is shown safely
    text.querySelector(".task-title").textContent = task.title;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.setAttribute("aria-label", "Delete '" + task.title + "'");
    deleteButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>';
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    // Put the three parts inside the <li>, and the <li> inside the list
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
    visibleCount++;
  }

  // Show the "nothing here" message if the list is empty
  emptyState.hidden = visibleCount > 0;

  updateProgress();
}


// ---------- 6. Progress bar ----------

function updateProgress() {
  const total = tasks.length;

  // Count finished tasks
  let doneCount = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done) { doneCount++; }
  }

  // Avoid dividing by zero when there are no tasks
  let percent = 0;
  if (total > 0) {
    percent = Math.round((doneCount / total) * 100);
  }

  progressPercent.textContent = percent + "%";
  progressFill.style.width = percent + "%";
  progressText.textContent = doneCount + " of " + total + " tasks done";
}


// ---------- 7. The three main actions ----------

// ADD a task
function addTask(title, course, due, priority) {
  const newTask = {
    id: Date.now(), // the current time in milliseconds = a unique number
    title: title,
    course: course,
    due: due,
    priority: priority,
    done: false
  };
  tasks.push(newTask); // add to the end of the array
  saveTasks();
  showTasks();
}

// MARK COMPLETE (or undo): flip done between true and false
function toggleTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].done = !tasks[i].done;
    }
  }
  saveTasks();
  showTasks();
}

// DELETE a task: keep every task EXCEPT the one with this id
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveTasks();
  showTasks();
}


// ---------- 8. Event handling ----------

// When the form is submitted (button click or Enter key)
taskForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const title = titleInput.value.trim(); // trim() removes extra spaces

  // Simple validation: the task needs a title
  if (title === "") {
    taskError.textContent = "Please type a task first.";
    titleInput.focus();
    return; // stop here
  }
  taskError.textContent = "";

  addTask(title, courseInput.value.trim(), dateInput.value, priorityInput.value);

  // Reset the form for the next task
  taskForm.reset();
  priorityInput.value = "medium";
  titleInput.focus();
});

// Filter buttons: All / To do / Done
for (let i = 0; i < showButtons.length; i++) {
  showButtons[i].addEventListener("click", function () {
    for (let j = 0; j < showButtons.length; j++) {
      showButtons[j].classList.remove("active");
    }
    this.classList.add("active");
    currentView = this.dataset.show;
    showTasks();
  });
}

// "Clear completed" removes every finished task
clearDoneButton.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return task.done === false;
  });
  saveTasks();
  showTasks();
});


// ---------- 9. Start ----------
showTasks();
