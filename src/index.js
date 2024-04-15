let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// Function to fetch Andy's toys and render them
function fetchToys() {
fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((toys) => {
    toys.forEach((toy) => renderToy(toy));
  });
}

// Function to render a toy card
function renderToy(toy) {
const toyCollection = document.getElementById("toy-collection");

const toyCard = document.createElement("div");
toyCard.className = "card";

toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id="${toy.id}">Like ❤️</button>
`;

toyCollection.appendChild(toyCard);
}

// Function to create a new toy
function createToy(name, image) {
const data = {
  name: name,
  image: image,
  likes: 0
};

fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(data)
})
  .then((response) => response.json())
  .then((newToy) => {
    renderToy(newToy);
  });
}

// Function to update toy likes
function updateLikes(toyId) {
const toyCard = document.getElementById(toyId);
const currentLikes = parseInt(toyCard.previousElementSibling.textContent);
const newLikes = currentLikes + 1;

fetch(`http://localhost:3000/toys/${toyId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    likes: newLikes
  })
})
  .then((response) => response.json())
  .then((updatedToy) => {
    toyCard.previousElementSibling.textContent = `${updatedToy.likes} Likes`;
  });
}
