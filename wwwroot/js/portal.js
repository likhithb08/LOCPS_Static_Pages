// wwwroot/js/portal.js

// Simple client‑side router based on query parameter "role"
function getRole() {
  const params = new URLSearchParams(window.location.search);
  return params.get('role') || '';
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(div => {
    div.style.display = 'none';
  });
  const el = document.getElementById(sectionId);
  if (el) el.style.display = 'block';
}

function initPortal() {
  const role = getRole();
  if (!role) return; // no role, maybe stay on login page
  // Load appropriate dashboard
  if (role === 'customer') {
    showSection('customer-dashboard');
  } else if (role === 'loanofficer') {
    showSection('loan-officer-dashboard');
  } else if (role === 'underwriter') {
    showSection('underwriter-dashboard');
  } else if (role === 'admin') {
    showSection('admin-dashboard');
  }
}

// ------------------- KYC Simulation -------------------
function simulateKYC() {
  const files = document.querySelectorAll('#kyc-input input[type=file]');
  const allProvided = Array.from(files).every(f => f.files.length > 0);
  const statusEl = document.getElementById('kyc-status');
  if (allProvided) {
    statusEl.textContent = 'KYC verification in progress...';
    setTimeout(() => {
      statusEl.textContent = 'KYC verified ✅';
      // After KYC, calculate credit score
      calculateCreditScore();
    }, 1500);
  } else {
    statusEl.textContent = 'Please upload all required documents (Aadhaar, PAN, Passport).';
  }
}

// ------------------- Credit Score -------------------
function calculateCreditScore() {
  const score = Math.floor(Math.random() * 200) + 600; // 600‑800 range
  const scoreEl = document.getElementById('credit-score');
  scoreEl.textContent = `Credit Score: ${score}`;
  // Show next step for underwriter if role permits
  const role = getRole();
  if (role === 'underwriter') {
    document.getElementById('underwriter-actions').style.display = 'block';
  }
}

// ------------------- Loan Decision -------------------
function decideLoan(accept) {
  const resultEl = document.getElementById('decision-result');
  if (accept) {
    resultEl.textContent = 'Loan Accepted 🎉';
    // Simulate disbursement display on customer dashboard
    if (getRole() === 'customer') {
      document.getElementById('disbursement-status').textContent = 'Amount Disbursed to your account.';
    }
  } else {
    resultEl.textContent = 'Loan Rejected ❌';
  }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initPortal);
