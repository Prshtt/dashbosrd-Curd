let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
})
// Get the table and modal elements
const table = document.getElementById('crud-table');
const tbody = document.getElementById('table-body');
const modal = document.getElementById('modal');
const form = document.getElementById('crud-form');
const addBtn = document.getElementById('add-btn');

// Sample data
let data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  { id: 3, name: 'Bob Smith', email: 'bob@example.com' },
];

// Render table data
function renderTable() {
  tbody.innerHTML = '';
  data.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>
        <button class="edit-btn" data-id="${item.id}">Edit</button>
        <button class="delete-btn" data-id="${item.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Add event listeners
addBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  document.getElementById('modal-title').innerText = 'Add New';
  form.reset();
});

table.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const id = e.target.dataset.id;
    const item = data.find((item) => item.id === parseInt(id));
    modal.style.display = 'block';
    document.getElementById('modal-title').innerText = 'Edit';
    form.name.value = item.name;
    form.email.value = item.email;
  } else if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    data = data.filter((item) => item.id!== parseInt(id));
    renderTable();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('modal-title').innerText === 'Add New'? data.length + 1 : parseInt(form.name.dataset.id);
  const name = form.name.value;
  const email = form.email.value;
  if (document.getElementById('modal-title').innerText === 'Add New') {
    data.push({ id, name, email });
  } else {
    const index = data.findIndex((item) => item.id === id);
    data[index].name = name;
    data[index].email = email;
  }
  renderTable();
  modal.style.display = 'none';
});

// Render table data initially
renderTable();