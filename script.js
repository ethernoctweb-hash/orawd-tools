const form = document.getElementById('wdForm');
const phoneInput = document.getElementById('phone');
const errorMessage = document.getElementById('errorMessage');
const modal = document.getElementById('successModal');
const displayPhone = document.getElementById('displayPhone');
const closeModal = document.getElementById('closeModal');
const confirmButton = document.getElementById('confirmButton');
const submitButton = document.getElementById('submitButton');
const buttonLabel = submitButton.querySelector('.button-label');

function normalizePhone(value) {
let digits = value.replace(/\D/g, '');
if (digits.startsWith('0062')) digits = digits.slice(4);
else if (digits.startsWith('62')) digits = digits.slice(2);
if (digits.startsWith('0')) digits = digits.slice(1);
return digits;
}

function openSuccess(phone) {
displayPhone.textContent = phone;
modal.hidden = false;
document.body.style.overflow = 'hidden';
confirmButton.focus();
}

function hideSuccess() {
modal.hidden = true;
document.body.style.overflow = '';
phoneInput.focus();
}

form.addEventListener('submit', (event) => {
event.preventDefault();
if (submitButton.disabled) return;

const digits = normalizePhone(phoneInput.value);
if (digits.length < 9 || digits.length > 13) {
errorMessage.hidden = false;
phoneInput.setAttribute('aria-invalid', 'true');
phoneInput.focus();
return;
}

errorMessage.hidden = true;
phoneInput.removeAttribute('aria-invalid');

// Simulated interface loading only; this does not submit data to a server.
submitButton.disabled = true;
submitButton.classList.add('is-loading');
buttonLabel.textContent = 'MEMPROSES PENGAJUAN...';

window.setTimeout(() => {
submitButton.disabled = false;
submitButton.classList.remove('is-loading');
buttonLabel.textContent = 'AJUKAN WD 100%';
openSuccess('0' + digits);
}, 1150);
});

phoneInput.addEventListener('input', () => {
errorMessage.hidden = true;
phoneInput.removeAttribute('aria-invalid');
});

closeModal.addEventListener('click', hideSuccess);
confirmButton.addEventListener('click', hideSuccess);
modal.addEventListener('click', (event) => {
if (event.target === modal) hideSuccess();
});
document.addEventListener('keydown', (event) => {
if (event.key === 'Escape' && !modal.hidden) hideSuccess();
});