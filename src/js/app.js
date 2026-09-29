
let tasks = [];

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
          </main>
        </ion-content>
      </div>

      <!-- Add Task Modal -->
      <ion-modal id="task-modal">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Add Study Task</ion-title>
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

  // Open and close the task modal
  document.querySelector('#add-task-button').addEventListener('click', () => {
    form.reset();
    document.querySelector('#task-priority').value = 'Medium';
    modal.present();
  });

  document.querySelector('#close-modal-button')
    .addEventListener('click', () => modal.dismiss());

  document.querySelector('#cancel-task-button')
    .addEventListener('click', () => modal.dismiss());

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

    const task = {
      id: crypto.randomUUID(),
      title,
      subject,
      description,
      dueDate,
      priority,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    tasks.push(task);
    updateDashboard();
    await modal.dismiss();
    form.reset();
    document.querySelector('#task-priority').value = 'Medium';

    await showMessage('Your study task has been added!');
  });

  // Navigation placeholder for the next development step
  document.querySelectorAll('[data-page]').forEach((item) => {
    item.addEventListener('click', () => {
      console.log(`Selected page: ${item.dataset.page}`);
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
          }">${escapeHTML(task.priority)}</ion-badge>
        </div>

        ${task.description
          ? `<p>${escapeHTML(task.description)}</p>`
          : ''
        }

        <p class="task-due-date">
          <ion-icon name="calendar-outline"></ion-icon>
          Due: ${escapeHTML(task.dueDate)}
        </p>
        <ion-badge color="medium">${escapeHTML(task.status)}</ion-badge>
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