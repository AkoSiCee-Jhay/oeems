document.addEventListener('DOMContentLoaded', () => {
  // === DOM ELEMENTS ===
  // Drawer & Landing Navigation
  const openDrawerBtn = document.getElementById('openDrawerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const navDrawerOverlay = document.getElementById('navDrawerOverlay');
  const drawerApplyBtn = document.getElementById('drawerApplyBtn');
  const heroRegisterBtn = document.getElementById('heroRegisterBtn');
  const drawerCloseLinks = document.querySelectorAll('.drawer-close-link');

  // Modals
  const registerModal = document.getElementById('registerModal');
  const otpModal = document.getElementById('otpModal');
  const loginModal = document.getElementById('loginModal');
  const closeModals = document.querySelectorAll('.close-modal');
  const openLoginFromReg = document.getElementById('openLoginFromReg');

  // Forms & Inputs
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const otpInputs = document.querySelectorAll('.otp-box');
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');

  // Dashboard & Views
  const landingSection = document.getElementById('home');
  const missionSection = document.querySelector('.info-container');
  const dashboardView = document.getElementById('dashboardView');
  const dashboardNavLinks = document.querySelectorAll('.sidebar-item');
  const viewPanels = document.querySelectorAll('.dashboard-panel');

  // Exam Slot Reservation Elements
  const examDateSelect = document.getElementById('examDate');
  const examTimeSelect = document.getElementById('examTime');
  const availableSlotsBadge = document.getElementById('availableSlots');
  const confirmReservationBtn = document.getElementById('confirmReservationBtn');
  const reservationSummary = document.getElementById('reservationSummary');

  // Mobile Dashboard Sidebar Toggle
  const dashboardHamburger = document.querySelector('.hamburger');
  const sidebarMenu = document.querySelector('.sidebar-menu');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');

  // === 1. LANDING & OFF-CANVAS DRAWER LOGIC ===
  if (openDrawerBtn) {
    openDrawerBtn.addEventListener('click', () => {
      navDrawerOverlay.classList.remove('hidden');
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', () => {
      navDrawerOverlay.classList.add('hidden');
    });
  }

  drawerCloseLinks.forEach(link => {
    link.addEventListener('click', () => {
      navDrawerOverlay.classList.add('hidden');
    });
  });

  // Accordion Logic for Mobile Drawer Submenus
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const submenu = toggle.nextElementSibling;
      toggle.classList.toggle('active');
      if (submenu) {
        submenu.classList.toggle('hidden');
      }
    });
  });

  // === 2. AUTHENTICATION & MODAL LOGIC ===
  const openRegister = (e) => {
    if (e) e.preventDefault();
    navDrawerOverlay.classList.add('hidden');
    registerModal.classList.remove('hidden');
  };

  if (heroRegisterBtn) heroRegisterBtn.addEventListener('click', openRegister);
  if (drawerApplyBtn) drawerApplyBtn.addEventListener('click', openRegister);

  // Close All Modals
  closeModals.forEach(btn => {
    btn.addEventListener('click', () => {
      registerModal.classList.add('hidden');
      otpModal.classList.add('hidden');
      loginModal.classList.add('hidden');
    });
  });

  // Open Login from Register Modal
  if (openLoginFromReg) {
    openLoginFromReg.addEventListener('click', (e) => {
      e.preventDefault();
      registerModal.classList.add('hidden');
      loginModal.classList.remove('hidden');
    });
  }

  // Register Submit -> Trigger OTP Modal
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      registerModal.classList.add('hidden');
      otpModal.classList.remove('hidden');
      if (otpInputs.length > 0) otpInputs[0].focus();
    });
  }

  // OTP Auto-Tab Focus Logic
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Verify OTP -> Show Dashboard View
  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', () => {
      alert('Verification successful! Welcome to GRC Entrance Exam Portal.');
      otpModal.classList.add('hidden');
      showDashboard();
    });
  }

  // Login Submit -> Show Dashboard View
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginModal.classList.add('hidden');
      showDashboard();
    });
  }

  function showDashboard() {
  // 1. Itago ang public landing header/navbar
  const landingHeader = document.querySelector('header');
  if (landingHeader) landingHeader.classList.add('hidden');

  // 2. Itago ang landing sections
  if (landingSection) landingSection.classList.add('hidden');
  if (missionSection) missionSection.classList.add('hidden');

  // 3. Ipakita ang Dashboard View lamang
  if (dashboardView) dashboardView.classList.remove('hidden');
}
  // === 3. DASHBOARD PANELS & SIDEBAR LOGIC ===
  dashboardNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetPanelId = link.getAttribute('data-target');
      if (!targetPanelId) return;

      e.preventDefault();
      dashboardNavLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');

      viewPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });

      if (sidebarMenu) sidebarMenu.classList.remove('active');
      if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
    });
  });

  // Mobile Dashboard Sidebar Toggle
  if (dashboardHamburger) {
    dashboardHamburger.addEventListener('click', () => {
      sidebarMenu.classList.toggle('active');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('hidden');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebarMenu.classList.remove('active');
      sidebarOverlay.classList.add('hidden');
    });
  }

  // === 4. ENTRANCE EXAM SLOT RESERVATION LOGIC ===
  const mockSlotDatabase = {
    '2026-05-10': { '09:00': 15, '13:00': 5 },
    '2026-05-12': { '09:00': 2,  '13:00': 20 },
    '2026-05-15': { '09:00': 0,  '13:00': 12 }
  };

  function updateSlotCount() {
    if (!examDateSelect || !examTimeSelect) return;
    const date = examDateSelect.value;
    const time = examTimeSelect.value;

    if (mockSlotDatabase[date] && mockSlotDatabase[date][time] !== undefined) {
      const count = mockSlotDatabase[date][time];
      if (availableSlotsBadge) {
        availableSlotsBadge.textContent = `${count} Slots Remaining`;
        availableSlotsBadge.className = count > 0 ? 'badge-success' : 'badge-danger';
      }
      if (confirmReservationBtn) confirmReservationBtn.disabled = count === 0;
    }
  }

  if (examDateSelect) examDateSelect.addEventListener('change', updateSlotCount);
  if (examTimeSelect) examTimeSelect.addEventListener('change', updateSlotCount);

  if (confirmReservationBtn) {
    confirmReservationBtn.addEventListener('click', () => {
      const date = examDateSelect.value;
      const time = examTimeSelect.value;

      if (mockSlotDatabase[date] && mockSlotDatabase[date][time] > 0) {
        mockSlotDatabase[date][time]--;
        updateSlotCount();

        if (reservationSummary) {
          reservationSummary.innerHTML = `
            <div class="summary-box">
              <h3><i class="bi bi-check-circle-fill"></i> Reservation Confirmed!</h3>
              <p><strong>Exam Date:</strong> ${date}</p>
              <p><strong>Time Slot:</strong> ${time === '09:00' ? '9:00 AM - 11:00 AM' : '1:00 PM - 3:00 PM'}</p>
              <p><strong>Venue:</strong> GRC Main Campus - Testing Room A</p>
              <button onclick="window.print()" class="btn-secondary mt-2 no-print">Print Permit</button>
            </div>
          `;
        }
      }
    });
  }
});