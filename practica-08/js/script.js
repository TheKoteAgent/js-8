document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const userList = document.querySelector(".users-list");
  const STORAGE_KEY = "usersList";

  let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  function saveUsers() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  function renderUsers() {
    userList.innerHTML = "";
    users.forEach((user, index) => {
      const li = document.createElement("li");
      li.className =
        "list-item d-flex justify-content-between align-items-start bg-light p-3 mb-2 rounded";

      li.innerHTML = `
          <div class="user-data-container">
            <div class="user-data"><span class="user-data-label">Name:</span> ${user.name}</div>
            <div class="user-data"><span class="user-data-label">Age:</span> ${user.age}</div>
            <div class="user-data"><span class="user-data-label">Email:</span> ${user.email}</div>
          </div>
          <button class="user-delete-button btn btn-danger btn-sm" title="Delete user">&times;</button>
        `;

      li.querySelector(".user-delete-button").addEventListener("click", () => {
        users.splice(index, 1);
        saveUsers();
        renderUsers();
      });

      userList.appendChild(li);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form["user-name"].value.trim();
    const age = parseInt(form["user-age"].value);
    const email = form["user-email"].value.trim();

    if (name && age && email) {
      users.push({ name, age, email });
      saveUsers();
      renderUsers();
      form.reset();
    }
  });

  renderUsers();
});
