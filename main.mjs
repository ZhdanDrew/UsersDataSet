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
    // <button class="delete-user-button" id="delete-user-${i}">Delete</button>
    // const deleteButton = document.getElementById(`delete-user-${i}`);

    setTimeout(() => {
      const deleteButton = document.createElement("button");

      console.log(deleteButton, "deleteButton");

      deleteButton.textContent = "Delete";

      deleteButton.onclick = () => {
        console.log(`Delete user:`, user);

        const result = USERS.filter((u) => user.fullname !== u.fullname);

        renderUsers(result);
      };

      const userElement = document.getElementById(`user-${i}`);
      userElement.appendChild(deleteButton);
    }, 1000);
  });
}

renderUsers(USERS);





//HW
function uniqueElements(arr) {
const uniqueMap = {};
const uniqueArray = [];

arr.forEach(element => {
    if (!uniqueMap[element]) {
    uniqueArray.push(element);
    uniqueMap[element] = true;
    }
});

return uniqueArray;
}

const inputArray = [1, 2, 3, 4, 2, 3, 5];
console.log(uniqueElements(inputArray), "!!!")


function searchSum(arr, k) {
    const numMap = {}; 

    for (let i = 0; i < arr.length; i++) {
    const complement = k - arr[i]; 

    if (numMap[complement] !== undefined) {
        return [complement, arr[i]]; 
    }


    numMap[arr[i]] = i;
    }

    return null; 
}

const inputArray1 = [1, 2, 3, 4, 5];
const targetSum = 9;
const result = searchSum(inputArray1, targetSum);

console.log(result);