document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirmPassword');
  const submitBtn = document.getElementById('submitBtn');

  // 1. LIVE PASSWORD STRENGTH VALIDATION
  function validatePassword() {
    const val = passwordInput.value;
    const checks = {
      'rule-length': val.length >= 8,
      'rule-case': /[a-z]/.test(val) && /[A-Z]/.test(val),
      'rule-number': /\d/.test(val),
      'rule-special': /[\W_]/.test(val)
    };

    let allValid = true;
    for (const id in checks) {
      const li = document.getElementById(id);
      if (li) {
        li.classList.toggle('valid', checks[id]);
      }
      if (!checks[id]) allValid = false;
    }

    const passwordsMatch = val && val === confirmInput.value;
    submitBtn.disabled = !(allValid && passwordsMatch);
  }

  if (passwordInput && confirmInput) {
    passwordInput.addEventListener('input', validatePassword);
    confirmInput.addEventListener('input', validatePassword);
  }

  // 2. EYE-ICON SHOW/HIDE TOGGLE
  function setupToggle(btnId, inputId, iconId) {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (btn && input && icon) {
      btn.addEventListener('click', () => {
        const isHidden = input.type === 'password';
        input.type = isHidden ? 'text' : 'password';
        icon.className = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
        btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
      });
    }
  }

  setupToggle('togglePassword', 'password', 'eyeIconPassword');
  setupToggle('toggleConfirmPassword', 'confirmPassword', 'eyeIconConfirm');

  // 3. SIGN UP FORM SUBMISSION -> OPEN OTP MODAL
  const signupForm = document.getElementById('signupForm');
  const otpModal = document.getElementById('otpModal');
  const closeOtpBtn = document.getElementById('closeOtpBtn');

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Buksan ang OTP modal kapag na-click ang Create Account
      if (otpModal) {
        otpModal.classList.remove('hidden');
      }
    });
  }

  if (closeOtpBtn && otpModal) {
    closeOtpBtn.addEventListener('click', () => {
      otpModal.classList.add('hidden');
    });
  }

  // 4. OTP INPUT AUTO-FOCUS LOGIC
  const otpBoxes = document.querySelectorAll('.otp-box');
  otpBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < otpBoxes.length - 1) {
        otpBoxes[index + 1].focus();
      }
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && index > 0 && !box.value) {
        otpBoxes[index - 1].focus();
      }
    });
  });

  // 5. OTP VERIFICATION & DASHBOARD REDIRECT (DEMO ACCOUNT)
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');
  const otpMessage = document.getElementById('otpMessage');

  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', () => {
      // Kunin ang tinipid na 4-digit OTP
      let enteredOtp = '';
      otpBoxes.forEach(box => enteredOtp += box.value);

      // Tanggapin ang '1234' o kahit anong 4-digit code para sa testing
      if (enteredOtp.length === 4) {
        if (otpMessage) {
          otpMessage.textContent = 'OTP Verified! Creating demo account...';
          otpMessage.style.color = '#4dd08a';
        }

        setTimeout(() => {
          // I-redirect papuntang dashboard (pwedeng dashboard.html o index.html?user=demo)
          window.location.href = 'dashboard.html'; 
        }, 1200);
      } else {
        if (otpMessage) {
          otpMessage.textContent = 'Please enter a valid 4-digit code.';
          otpMessage.style.color = '#ff6b6b';
        }
      }
    });
  }
});