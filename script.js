const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");
const loader = document.getElementById("loader");
const errorDiv = document.getElementById("error");

const API_URL = "https://jsonplaceholder.typicode.com/users";

async function fetchUsers() {
  userContainer.innerHTML = "";
  errorDiv.classList.add("hidden");
  loader.classList.remove("hidden");

  try {
    const response = await fetch(API_URL);

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const users = await response.json();

    displayUsers(users);

  } catch (error) {
    errorDiv.textContent = "Failed to fetch data. Please check your internet connection.";
    errorDiv.classList.remove("hidden");
    console.error("Fetch Error:", error);
  } finally {
    loader.classList.add("hidden");
  }
}

function displayUsers(users) {
  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> 
        ${user.address.street}, 
        ${user.address.city}
      </p>
    `;

    userContainer.appendChild(card);
  });
}

reloadBtn.addEventListener("click", fetchUsers);

// Initial Load
fetchUsers();