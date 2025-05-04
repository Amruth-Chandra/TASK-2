// --- Contact Form Validation ---
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll('.error').forEach(span => span.textContent = '');

  const nameInput = form.name;
  if (!nameInput.value.trim()) {
    form.querySelector('#name + .error').textContent = 'Name is required.';
    valid = false;
  }

  const emailInput = form.email;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    form.querySelector('#email + .error').textContent = 'Email is required.';
    valid = false;
  } else if (!emailPattern.test(emailInput.value)) {
    form.querySelector('#email + .error').textContent = 'Enter a valid email.';
    valid = false;
  }

  if (valid) {
    alert('Form submitted successfully!');
    form.reset();
  }
});

// --- To‑Do List ---
const taskInput   = document.getElementById('newTask');
const addTaskBtn  = document.getElementById('addTaskBtn');
const taskList    = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.textContent = text;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '✕';
  removeBtn.className = 'task-remove';
  removeBtn.addEventListener('click', () => li.remove());

  li.appendChild(removeBtn);
  taskList.appendChild(li);

  taskInput.value = '';
  taskInput.focus();
}

// --- Image Gallery ---
const imgInput     = document.getElementById('newImageUrl');
const addImageBtn  = document.getElementById('addImageBtn');
const imageGrid    = document.getElementById('imageGrid');

addImageBtn.addEventListener('click', addImage);
imgInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addImage();
});

function addImage() {
  const url = imgInput.value.trim();
  // Validate image extension
  if (!url.match(/\.(jpe?g|png|gif)(\?.*)?$/i)) {
    alert('Please enter a valid image URL (jpg, png, gif).');
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'image-item';

  // Loading placeholder
  const placeholder = document.createElement('div');
  placeholder.textContent = 'Loading…';
  placeholder.className = 'loading-placeholder';
  wrapper.appendChild(placeholder);

  // Create image and handle load/error
  const img = new Image();
  img.alt = 'Gallery image';
  img.onload = () => wrapper.replaceChild(img, placeholder);
  img.onerror = () => {
    placeholder.textContent = 'Failed to load image.';
    setTimeout(() => wrapper.remove(), 2000);
  };
  img.src = url;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '✕';
  removeBtn.className = 'image-remove';
  removeBtn.addEventListener('click', () => wrapper.remove());

  wrapper.appendChild(removeBtn);
  imageGrid.appendChild(wrapper);

  imgInput.value = '';
  imgInput.focus();
}
