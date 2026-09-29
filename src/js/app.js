import { save } from "ionicons/icons";

const STORAGE_KEY = 'studentStudyPlannerTasks';

let tasks = loadTasks();

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    console.log('Tasks saved:', tasks);
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
}

export function renderApp() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <ion-app>
      <ion-menu content-id="main-content">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Study Planner</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list>
            <ion-menu-toggle>
              <ion-item button data-page="dashboard">
                <ion-icon name="home-outline" slot="start"></ion-icon>
                <ion-label>Dashboard</ion-label>
              </ion-item>
              <ion-item button data-page="tasks">
                <ion-icon name="book-outline" slot="start"></ion-icon>
                <ion-label>My Tasks</ion-label>
              </ion-item>
              <ion-item button data-page="schedule">
                <ion-icon name="calendar-outline" slot="start"></ion-icon>
                <ion-label>Schedule</ion-label>
              </ion-item>
              <ion-item button data-page="settings">
                <ion-icon name="settings-outline" slot="start"></ion-icon>
                <ion-label>Settings</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>

      <div class="ion-page" id="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>Student Study Planner</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <main id="page-content">
            <section class="welcome-section">
              <h1>Welcome to your Study Planner!</h1>
              <p>Organize your studies and stay on top of your deadlines.</p>
            </section>

            <section class="summary-grid">
              <ion-card>
                <ion-card-content>
                  <ion-icon name="list-outline" color="primary"></ion-icon>
                  <p>Total Tasks</p>
                  <h2 id="total-tasks">0</h2>
                </ion-card-content>
              </ion-card>

              <ion-card>
                <ion-card-content>
                  <ion-icon name="checkmark-circle-outline" color="success"></ion-icon>
                  <p>Completed</p>
                  <h2 id="completed-tasks">0</h2>
                </ion-card-content>
              </ion-card>

              <ion-card>
                <ion-card-content>
                  <ion-icon name="time-outline" color="warning"></ion-icon>
                  <p>Pending</p>
                  <h2 id="pending-tasks">0</h2>
                </ion-card-content>
              </ion-card>
            </section>

            <section class="tasks-section">
              <div class="section-heading">
                <h2>Upcoming Tasks</h2>
                <ion-button id="add-task-button">
                  <ion-icon name="add-outline" slot="start"></ion-icon>
                  Add Task
                </ion-button>
              </div>

              <div id="task-list">
                <ion-card>
                  <ion-card-content class="empty-message">
                    No tasks yet. Add your first study task!
                  </ion-card-content>
                </ion-card>
              </div>
            </section>

            <section id="schedule-section" style="display: none;">
                <div class="section-heading">
                    <h2>Study Schedule</h2>
                </div>

                <p>View your study tasks by their due dates.</p>

                <div id="schedule-list">
                    <!-- Scheduled tasks will appear here -->
                </div>
            </section>

            <section id="settings-section" style="display: none;">
                <div class="section-heading">
                    <h2>Settings</h2>
                </div>

                <ion-card>
                    <ion-card-header>
                    <ion-card-title>About the App</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                    <p>Student Study Planner</p>
                    <p>Version 1.0.0</p>
                    <p>Organize your tasks and manage your study schedule.</p>
                    </ion-card-content>
                </ion-card>

                <ion-card>
                    <ion-card-header>
                    <ion-card-title>Data Management</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                    <p>Remove all saved study tasks from this device.</p>
                    <ion-button id="clear-tasks-btn" color="danger" expand="block">
                        Clear All Tasks
                    </ion-button>
                    </ion-card-content>
                </ion-card>
            </section>
          </main>
        </ion-content>
      </div>

      <!-- Add Task Modal -->
      <ion-modal id="task-modal">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title id="task-modal-title">Add Study Task</ion-title>
            <ion-buttons slot="end">
              <ion-button id="close-modal-button">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <form id="task-form">
            <ion-item>
              <ion-input
                id="task-title"
                label="Task Title"
                label-placement="stacked"
                placeholder="e.g., Review Chapter 1"
                maxlength="100"
                required>
              </ion-input>
            </ion-item>

            <ion-item>
              <ion-input
                id="task-subject"
                label="Subject"
                label-placement="stacked"
                placeholder="e.g., Web Development"
                maxlength="80"
                required>
              </ion-input>
            </ion-item>

            <ion-item>
              <ion-textarea
                id="task-description"
                label="Description"
                label-placement="stacked"
                placeholder="Enter task details (optional)"
                auto-grow="true"
                rows="3"
                maxlength="500">
              </ion-textarea>
            </ion-item>

            <ion-item>
              <ion-input
                id="task-due-date"
                type="date"
                label="Due Date"
                label-placement="stacked"
                required>
              </ion-input>
            </ion-item>

            <ion-item>
              <ion-select
                id="task-priority"
                label="Priority"
                label-placement="stacked"
                value="Medium"
                interface="popover">
                <ion-select-option value="Low">Low</ion-select-option>
                <ion-select-option value="Medium">Medium</ion-select-option>
                <ion-select-option value="High">High</ion-select-option>
              </ion-select>
            </ion-item>

            <div class="form-actions">
              <ion-button
                type="button"
                fill="outline"
                color="medium"
                id="cancel-task-button">
                Cancel
              </ion-button>
              <ion-button type="submit" id="save-task-button">
                <ion-icon name="save-outline" slot="start"></ion-icon>
                Save Task
              </ion-button>
            </div>
          </form>
        </ion-content>
      </ion-modal>
    </ion-app>
  `;

  const modal = document.querySelector('#task-modal');
  const form = document.querySelector('#task-form');

  let editingTaskId = null;

  // Open and close the task modal
document.querySelector('#add-task-button').addEventListener('click', () => {
  editingTaskId = null;
  form.reset();

  document.querySelector('#task-modal-title').textContent = 'Add Study Task';
  document.querySelector('#save-task-button').innerHTML = `
    <ion-icon name="save-outline" slot="start"></ion-icon>
    Save Task
  `;
  document.querySelector('#task-priority').value = 'Medium';

  modal.present();
});

  // Save a new task
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.querySelector('#task-title').value.trim();
  const subject = document.querySelector('#task-subject').value.trim();
  const description = document.querySelector('#task-description').value.trim();
  const dueDate = document.querySelector('#task-due-date').value;
  const priority = document.querySelector('#task-priority').value;

  if (!title || !subject || !dueDate) {
    await showMessage('Please fill in the title, subject, and due date.');
    return;
  }

  if (editingTaskId) {
    const task = tasks.find(task => task.id === editingTaskId);

    if (!task) {
      await showMessage('Task not found.');
      return;
    }

    task.title = title;
    task.subject = subject;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.updatedAt = new Date().toISOString();

    saveTasks();
    await modal.dismiss();
    await showMessage('Your study task has been updated!');
} else {
    const task = {
    id: crypto.randomUUID(),
    title,
    subject,
    description,
    dueDate,
    priority,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
    };

    tasks.push(task);
    saveTasks();
    updateDashboard();

    await modal.dismiss();
    await showMessage('Your study task has been added!');
}

editingTaskId = null;
form.reset();
document.querySelector('#task-priority').value = 'Medium';
updateDashboard();
});

document.querySelector('#task-list').addEventListener('click', async (event) => {
  const button = event.target.closest('ion-button[data-action]');

  if (!button) return;

  const taskId = button.dataset.id;
  const action = button.dataset.action;
  const task = tasks.find(task => task.id === taskId);

  if (!task) return;

  if (action === 'complete') {
    task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
    task.updatedAt = new Date().toISOString();
    saveTasks();
    updateDashboard();
  }

  if (action === 'edit') {
    editingTaskId = task.id;

    document.querySelector('#task-modal-title').textContent = 'Edit Study Task';
    document.querySelector('#task-title').value = task.title;
    document.querySelector('#task-subject').value = task.subject;
    document.querySelector('#task-description').value = task.description;
    document.querySelector('#task-due-date').value = task.dueDate;
    document.querySelector('#task-priority').value = task.priority;

    document.querySelector('#save-task-button').innerHTML = `
      <ion-icon name="save-outline" slot="start"></ion-icon>
      Update Task
    `;

    await modal.present();
  }

  if (action === 'delete') {
    const alert = document.createElement('ion-alert');
    alert.header = 'Delete Task';
    alert.message = `Are you sure you want to delete "${escapeHTML(task.title)}"?`;
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          tasks = tasks.filter(item => item.id !== taskId);
          saveTasks();
          updateDashboard();
        }
      }
    ];

    document.querySelector('ion-app').appendChild(alert);
    await alert.present();
    await alert.onDidDismiss();
    alert.remove();
  }
});

// Clear all tasks
document.querySelector('#clear-tasks-btn').addEventListener('click', async () => {
  const alert = document.createElement('ion-alert');

  alert.header = 'Clear All Tasks';
  alert.message = 'Are you sure you want to delete all your study tasks? This action cannot be undone.';
  alert.buttons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Clear All',
      role: 'destructive',
      handler: () => {
        tasks = [];
        saveTasks();
        updateDashboard();
        renderSchedule();
      }
    }
  ];

  document.querySelector('ion-app').appendChild(alert);
  await alert.present();
  await alert.onDidDismiss();
  alert.remove();
});

// Navigation
document.querySelectorAll('[data-page]').forEach((item) => {
  item.addEventListener('click', () => {
    const page = item.dataset.page;

    const welcome = document.querySelector('.welcome-section');
    const summary = document.querySelector('.summary-grid');
    const tasksSection = document.querySelector('.tasks-section');
    const scheduleSection = document.querySelector('#schedule-section');
    const pageContent = document.querySelector('#page-content');

    // Hide all main sections first
    welcome.style.display = 'none';
    summary.style.display = 'none';
    tasksSection.style.display = 'none';
    scheduleSection.style.display = 'none';

    if (page === 'dashboard') {
      welcome.style.display = '';
      summary.style.display = '';
      tasksSection.style.display = '';
      tasksSection.querySelector('.section-heading h2').textContent =
        'Upcoming Tasks';
      updateDashboard();
    }

    else if (page === 'tasks') {
      tasksSection.style.display = '';
      tasksSection.querySelector('.section-heading h2').textContent =
        'My Tasks';
      updateDashboard();
    }

    else if (page === 'schedule') {
      scheduleSection.style.display = '';
      renderSchedule();
    }

    else if (page === 'settings') {
    const settingsSection = document.querySelector('#settings-section');
    settingsSection.style.display = '';
    }
  });
});

  updateDashboard();
}

function updateDashboard() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'Completed').length;
  const pending = total - completed;

  document.querySelector('#total-tasks').textContent = total;
  document.querySelector('#completed-tasks').textContent = completed;
  document.querySelector('#pending-tasks').textContent = pending;

  renderTaskList();
}

function renderSchedule() {
  const scheduleList = document.querySelector('#schedule-list');

  if (!scheduleList) return;

  if (tasks.length === 0) {
    scheduleList.innerHTML = `
      <ion-card>
        <ion-card-content class="empty-message">
          No scheduled tasks yet. Add a task with a due date!
        </ion-card-content>
      </ion-card>
    `;
    return;
  }

  const sortedTasks = [...tasks].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate)
  );

  scheduleList.innerHTML = sortedTasks.map(task => `
    <ion-card class="task-card">
      <ion-card-content>
        <div class="task-card-heading">
          <div>
            <h3>${escapeHTML(task.title)}</h3>
            <p class="task-subject">${escapeHTML(task.subject)}</p>
          </div>

          <ion-badge color="${
            task.status === 'Completed' ? 'success' :
            task.priority === 'High' ? 'danger' :
            task.priority === 'Medium' ? 'warning' : 'success'
          }">
            ${escapeHTML(task.status)}
          </ion-badge>
        </div>

        <p class="task-due-date">
          <ion-icon name="calendar-outline"></ion-icon>
          Due: ${escapeHTML(task.dueDate)}
        </p>

        <ion-badge color="medium">
          ${escapeHTML(task.priority)} Priority
        </ion-badge>
      </ion-card-content>
    </ion-card>
  `).join('');
}

function renderTaskList() {
  const taskList = document.querySelector('#task-list');

  if (tasks.length === 0) {
    taskList.innerHTML = `
      <ion-card>
        <ion-card-content class="empty-message">
          No tasks yet. Add your first study task!
        </ion-card-content>
      </ion-card>
    `;
    return;
  }

  const sortedTasks = [...tasks].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate)
  );

  taskList.innerHTML = sortedTasks.map(task => `
    <ion-card class="task-card">
      <ion-card-content>
        <div class="task-card-heading">
          <div>
            <h3>${escapeHTML(task.title)}</h3>
            <p class="task-subject">${escapeHTML(task.subject)}</p>
          </div>

          <ion-badge color="${
            task.priority === 'High' ? 'danger' :
            task.priority === 'Medium' ? 'warning' : 'success'
          }">
            ${escapeHTML(task.priority)}
          </ion-badge>
        </div>

        ${task.description
          ? `<p>${escapeHTML(task.description)}</p>`
          : ''
        }

        <p class="task-due-date">
          <ion-icon name="calendar-outline"></ion-icon>
          Due: ${escapeHTML(task.dueDate)}
        </p>

        <ion-badge color="${
          task.status === 'Completed' ? 'success' : 'medium'
        }">
          ${escapeHTML(task.status)}
        </ion-badge>

        <div class="task-actions">
          <ion-button
            size="small"
            color="${task.status === 'Completed' ? 'medium' : 'success'}"
            data-action="complete"
            data-id="${task.id}">
            <ion-icon
              name="${task.status === 'Completed' ? 'refresh-outline' : 'checkmark-circle-outline'}"
              slot="start">
            </ion-icon>
            ${task.status === 'Completed' ? 'Undo' : 'Complete'}
          </ion-button>

          <ion-button
            size="small"
            fill="outline"
            color="primary"
            data-action="edit"
            data-id="${task.id}">
            <ion-icon name="create-outline" slot="start"></ion-icon>
            Edit
          </ion-button>

          <ion-button
            size="small"
            fill="outline"
            color="danger"
            data-action="delete"
            data-id="${task.id}">
            <ion-icon name="trash-outline" slot="start"></ion-icon>
            Delete
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  `).join('');
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

async function showMessage(message) {
  const alert = document.createElement('ion-alert');
  alert.header = 'Student Study Planner';
  alert.message = message;
  alert.buttons = ['OK'];
  document.querySelector('ion-app').appendChild(alert);
  await alert.present();
  await alert.onDidDismiss();
  alert.remove();
}