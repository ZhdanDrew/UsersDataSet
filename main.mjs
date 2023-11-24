import { faker } from "https://cdn.skypack.dev/@faker-js/faker";

const usersQuantity = 100;

function generateUser() {
  const user = {
    fullname: faker.person.fullName(),
    city: faker.location.city(),
    location: faker.location.country(),
    salary: faker.number.int({ min: 500, max: 5000 }),
    age: faker.number.int({ min: 7, max: 70 }),
    technologies: faker.helpers.arrayElements([
      "js",
      "html",
      "css",
      "react",
      "angular",
    ]),
    pictureURL: faker.image.avatar(),
  };

  return user;
}

function generateUsers(quantity) {
  const users = [];

  for (let i = 0; i < quantity; i++) {
    users.push(generateUser());
  }

  return users;
}

const USERS = generateUsers(usersQuantity);

// elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const usersWrapper = document.getElementById("users-wrapper");

const sortBySalaryCheckbox = document.getElementById("sort-by-salary");

sortBySalaryCheckbox.onchange = () => {
  if (sortBySalaryCheckbox.checked) {
    const usersToSort = [...USERS];

    const sortedUsers = usersToSort.sort(
      (user1, user2) => user1.salary - user2.salary
    );

    renderUsers(sortedUsers);
  } else {
    renderUsers(USERS);
  }
};

let searchResults = null;

searchButton.onclick = () => {
  if (!searchResults) {
    searchButton.textContent = "Reset search";
    const value = searchInput.value.toLowerCase();

    searchResults = USERS.filter((user) =>
      user.fullname.toLowerCase().includes(value) || 
      user.city.toLowerCase().includes(value)
    );
    renderUsers(searchResults);
  } else {
    searchButton.textContent = "Search";
    searchInput.value = "";
    searchResults = null;
    renderUsers(USERS);
  }
};

function renderUsers(users) {
  usersWrapper.innerHTML = "";

  users.forEach((user, i) => {
    const { fullname, city, location, pictureURL, salary, technologies, age } =
      user;
    usersWrapper.innerHTML += `
        <div class="user-item" id="user-${i}">
            <img alt="${fullname}" src="${pictureURL}" class="user-avatar" />
            <div>
                <h3>${fullname}, <span class="blue">${age}</span></h3>
                <h4>${salary} $</h4>
                <span>${location}, ${city}</span>
            </div>
            <div class="technologies">${technologies
              .map((tech) => `<img width="25" src="./assets/${tech}.svg" />`)
              .join("")}
            </div>
        </div>
    `;
    const deleteButton = document.createElement("button");

    console.log(deleteButton, "deleteButton");

    deleteButton.textContent = "🗑️";
    deleteButton.className = "delete-user-button"; 
    deleteButton.onclick = () => {
      console.log(`Delete user:`, user);

      const result = USERS.filter((u) => user.fullname !== u.fullname);

      renderUsers(result);
    };

    const userElement = document.getElementById(`user-${i}`);
    userElement.appendChild(deleteButton);
  });
}


renderUsers(USERS);

const sortByNameCheckbox = document.getElementById("sort-by-name");

sortByNameCheckbox.onchange = () => {
  if (sortByNameCheckbox.checked) {
    const usersToSort = [...USERS];

    const sortedUsers = usersToSort.sort((user1, user2) =>
      user1.fullname.localeCompare(user2.fullname)
    );

    renderUsers(sortedUsers);
  } else {
    renderUsers(USERS);
  }
};

const burgerToggle = document.getElementById("burger-toggle");

burgerToggle.addEventListener("change", () => {
    const burgerContent = document.querySelector(".burger-content");
    burgerContent.style.display = burgerToggle.checked ? "flex" : "none";
});


const sortBySalaryCheckboxBurger = document.getElementById("sort-by-salary");
const sortByNameCheckboxBurger = document.getElementById("sort-by-name");

sortBySalaryCheckboxBurger.addEventListener("change", () => {
    if (sortBySalaryCheckboxBurger.checked) {
        const usersToSort = [...USERS];

        const sortedUsers = usersToSort.sort(
            (user1, user2) => user1.salary - user2.salary
        );

        renderUsers(sortedUsers);
    } else {
        renderUsers(USERS);
    }
});

sortByNameCheckboxBurger.addEventListener("change", () => {
    if (sortByNameCheckboxBurger.checked) {
        const usersToSort = [...USERS];

        const sortedUsers = usersToSort.sort((user1, user2) =>
            user1.fullname.localeCompare(user2.fullname)
        );

        renderUsers(sortedUsers);
    } else {
        renderUsers(USERS);
    }
});