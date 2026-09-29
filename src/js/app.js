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

              <ion-card>
                <ion-card-content id="task-list">
                  <p class="empty-message">
                    No tasks yet. Add your first study task!
                  </p>
                </ion-card-content>
              </ion-card>
            </section>
          </main>
        </ion-content>
      </div>
    </ion-app>
  `;

  document.querySelectorAll('[data-page]').forEach((item) => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      console.log(`Selected page: ${page}`);
    });
  });

  document.querySelector('#add-task-button').addEventListener('click', () => {
    console.log('Add Task clicked');
  });
}