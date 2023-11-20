const inputElm = document.querySelector(".input");
const addElm = document.querySelector(".lol");
const messageElm = document.querySelector(".message");
const contentElm = document.querySelector(".list");
const listElm = document.querySelector(".list-item");
const deleteElm = document.querySelector(".delete");
const showTimeElm = document.querySelector(".showTime");
const saveBtnElm = document.querySelector(".save-btn");
const hidenInputElm = document.querySelector(".hiden-input");
// const editSecElm = document.querySelector(".edit-sec");
// const editInputElm = document.querySelector(".edit-input");
// const todoTextElm = document.querySelector(".todo-text");

addElm.addEventListener("click", addTask);

function addTask() {
  let inputValue = inputElm.value;
  if (inputValue) {
    messageElm.innerText = "";
    saveStorage();
    showContent();
  } else {
    messageElm.innerText = "inaput feild is requard";
  }
}
function saveStorage() {
  let inputValue = inputElm.value;
  let checkStorage = localStorage.getItem("savedItem");
  let addValue = [];
  if (checkStorage) {
    addValue = JSON.parse(checkStorage);
    addValue.push(inputValue);
    localStorage.setItem("savedItem", JSON.stringify(addValue));
    inputElm.value = "";
  } else {
    addValue.push(inputValue);
    localStorage.setItem("savedItem", JSON.stringify(addValue));
    inputElm.value = "";
  }
}

function savedDate() {
  let checkStorage = JSON.parse(localStorage.getItem("savedItem"));
  let addValue = checkStorage;
  let currentDate = new Date();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let date = currentDate.getDate();
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();

  let fullDate = `${year}-${month}-${date + 1}, ${hour}:${minute}`;
  console.log(fullDate);
  showTimeElm.innerText = fullDate;
}
// savedDate()

function showContent() {
  let checkStorage = JSON.parse(localStorage.getItem("savedItem"));
  let allvalue = "";

  checkStorage.map((text, index) => {
    allvalue =
      `<div class="list-item"><p class="index">${
        index + 1
      }.</p><p class="todo-text">${text}</p><div class="edit-sec"><input class="edit-input"type="text"placeholder="Enter Your Task"/><button type="button" class="save-button">Save</button></div><div class="icon d-flex"><div class="edit d-flex" onclick="editTask(${index})">
      <i class="fa-solid fa-pen-to-square" style="color: #22ed07"></i>
      <p>Edit</p>
    </div>
    <div class="delete d-flex" onclick="deleteTask(${index})">
      <i class="fa-solid fa-trash-can" style="color: #ff0000"></i>
      <p>Delete</p>
    </div></div></div>` + allvalue;
  });
  contentElm.innerHTML = allvalue;
}

showContent();

function deleteTask(id) {
  let checkStorage = JSON.parse(localStorage.getItem("savedItem"));
  let addValue = checkStorage;
  addValue.splice(id, 1);
  localStorage.setItem("savedItem", JSON.stringify(addValue));
  showContent();
  if (addValue.length === 0) {
    messageElm.innerText = "No data";
  } else {
  }
}

function editTask(id) {
  let checkStorage = JSON.parse(localStorage.getItem("savedItem"));
  let addValue = checkStorage;
  // editSecElm.style.display ="block";
  // todoTextElm.style.display ="none";
  addValue.map((list, index) => {
    if (index === id) {
      return inputElm.value = list;
    }
  });
  addElm.style.display = "none";
  saveBtnElm.style.display = "block";
  hidenInputElm.value = id;
}
saveBtnElm.addEventListener("click",updateList)
function updateList() {
  let checkStorage = JSON.parse(localStorage.getItem("savedItem"));
  let addValue = checkStorage;
  addValue.splice(hidenInputElm.value,1,inputElm.value)
  localStorage.setItem("savedItem", JSON.stringify(addValue));
  showContent()
  inputElm.value = ""
}
