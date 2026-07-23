const app = document.getElementById('app');

async function loadPartial(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return response.text();
}

async function init() {
    try {
        const shell = await loadPartial('layouts/shell.html');
        app.innerHTML = shell;

        const nav = await loadPartial('components/navbar.html');
        const sidebar = await loadPartial('components/sidebar.html');
        const footer = await loadPartial('components/footer.html');
        const buttons = await loadPartial('components/buttons.html');
        const cards = await loadPartial('components/cards.html');
        const tables = await loadPartial('components/tables.html');
        const charts = await loadPartial('components/charts.html');
        const modal = await loadPartial('components/modal.html');
        const toast = await loadPartial('components/toast.html');
        const loading = await loadPartial('components/loading-screen.html');
        const exerciseCard = await loadPartial('components/exercise-card.html');
        const profileCard = await loadPartial('components/profile-card.html');
        const progressCard = await loadPartial('components/progress-card.html');
        const dashboardCard = await loadPartial('components/dashboard-card.html');
        const statCard = await loadPartial('components/stat-card.html');

        document.getElementById('navbar-slot').innerHTML = nav;
        document.getElementById('sidebar-slot').innerHTML = sidebar;
        document.getElementById('main-content').innerHTML = `
      <section class="mb-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div class="space-y-4">
          ${dashboardCard}
          ${exerciseCard}
        </div>
        <div class="space-y-4">
          ${profileCard}
          ${progressCard}
          ${statCard}
        </div>
      </section>
      <section class="mb-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div class="space-y-4">
          ${cards}
          ${buttons}
        </div>
        <div class="space-y-4">
          ${charts}
          ${tables}
        </div>
      </section>
      <section class="mb-6 grid gap-4 lg:grid-cols-2">
        ${modal}
        ${toast}
      </section>
      <section class="mb-6">
        ${loading}
      </section>
    `;
        document.getElementById('footer-slot').innerHTML = footer;

        const modalTrigger = document.getElementById('modal-trigger');
        const modalPanel = document.getElementById('modal-panel');
        const toastTrigger = document.getElementById('toast-trigger');
        const toastBox = document.getElementById('toast-box');
        const loadingTrigger = document.getElementById('loading-trigger');
        const loadingScreen = document.getElementById('loading-screen');
        const closeModal = document.getElementById('close-modal');

        modalTrigger?.addEventListener('click', () => {
            modalPanel?.classList.remove('hidden');
            document.body.classList.add('modal-open');
        });

        closeModal?.addEventListener('click', () => {
            modalPanel?.classList.add('hidden');
            document.body.classList.remove('modal-open');
        });

        toastTrigger?.addEventListener('click', () => {
            toastBox?.classList.remove('hidden');
            setTimeout(() => toastBox?.classList.add('hidden'), 2200);
        });

        loadingTrigger?.addEventListener('click', () => {
            loadingScreen?.classList.remove('hidden');
            setTimeout(() => loadingScreen?.classList.add('hidden'), 1700);
        });
    } catch (error) {
        app.innerHTML = `<div class="p-8 text-sm text-red-600">Unable to load component shell: ${error.message}</div>`;
    }
}

init();
