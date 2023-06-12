function populateTable() {
  fetch("./db.json")
    .then((response) => response.json())
    .then((data) => {
      const itemList = document.getElementById("itemList");

      itemList.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        const item = data[i];

        const row = document.createElement("tr");

        const itemNameCell = document.createElement("td");
        itemNameCell.textContent = item.itemName;
        itemNameCell.classList.add("admintd");
        row.appendChild(itemNameCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = item.date;
        dateCell.classList.add("admintd");
        row.appendChild(dateCell);

        const timeStartCell = document.createElement("td");
        timeStartCell.textContent = item.startTime;
        timeStartCell.classList.add("admintd");
        row.appendChild(timeStartCell);

        const timeEndCell = document.createElement("td");
        timeEndCell.textContent = item.endTime;
        timeEndCell.classList.add("admintd");
        row.appendChild(timeEndCell);

        const availabilityCell = document.createElement("td");
        availabilityCell.textContent = item.available
          ? "Available"
          : "Not Available";
        availabilityCell.classList.add("admintd");
        row.appendChild(availabilityCell);

        const actionsCell = document.createElement("tr");
        actionsCell.innerHTML = `<button onclick="deleteItem(${i})">Delete</button>`;
        row.appendChild(actionsCell);
        const actionsCell2 = document.createElement("tr");
        actionsCell2.innerHTML = `<button onclick="changeItem(${i})">Change</button>`;
        row.appendChild(actionsCell2);

        itemList.appendChild(row);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function convertToMilitaryTime(time) {
  const [hours, minutes] = time.split(/:| /);
  const ampm = time.substring(time.length - 2);
  let militaryHours = parseInt(hours);

  if (ampm == "PM" && hours != 12) {
    militaryHours += 12;
  }
  return `${militaryHours}:00`;
}

function submitForm(event) {
  event.preventDefault();

  const itemName = document.getElementById("addItem").value;
  const startTime = convertToMilitaryTime(
    document.getElementById("start").value
  );
  const endTime = convertToMilitaryTime(document.getElementById("end").value);
  const availDate = document.getElementById("date").value;
  const date = formatDate(new Date(availDate));

  let available = [];
  const startHour = parseInt(startTime.split(":")[0]);
  const endHour = parseInt(endTime.split(":")[0]);

  for (let i = startHour; i < endHour; i++) {
    available.push(true);
  }

  const newItem = {
    itemName: itemName,
    date: date,
    startTime: startTime,
    endTime: endTime,
    available: available,
  };

  fetch("/write_db", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  })
    .then((response) => response.text())
    .then((message) => {
      console.log("Server response:", message);
      location.reload();
    })
    .catch((error) => {
      console.error("Error writing to JSON data:", error);
    });
}

function formatDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear().toString().substr(-2); //2023 -> 23
  return month + "/" + day + "/" + year;
}

function deleteItem(index) {
  fetch(`/delete/${index}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((message) => {
      console.log("Server response:", message);
      location.reload();
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
}

let itemName_global = "";
let date_global = "";
let startTime_global = "";
let endTime_global = "";
let available_global = [];
let index_global = 0

function changeItem(index) {
  console.log(index);
  index_global = index;
  fetch('/read_db')
  .then(response => response.json())
  .then(object => {
    console.log(object[index]);
    itemName_global = object[index].itemName;
    date_global = object[index].date;
    startTime_global = object[index].startTime;
    endTime_global = object[index].endTime;
    available_global = object[index].available;
  })
  .catch(error => {
    console.error('Error:', error);
  });
  document.getElementById("item-name").innerText = itemName_global;
  document.getElementById("date").innerText = date_global;
  document.getElementById("start_time").innerText = startTime_global;
  document.getElementById("end_time").innerText = endTime_global;
  var j = 1
  for (let i = 0; i < available_global.length; i++) {
    document.getElementById(`btn${j}`).checked = available_global[i]
    j = j + 1;
  }
}

function updateCheck(index) {
  btn_index = index + 1;
  available_global[index] = document.getElementById(`btn${btn_index}`).checked
}

function submitEdit(){
  const newdata = {
    index: index_global,
    itemName: itemName_global,
    date: date_global,
    startTime: startTime_global,
    endTime: endTime_global,
    available: available_global
  };
  
  fetch('/update_db', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newdata)
  })
  .then(response => response.text())
  .then(message => {
    console.log('Server response:', message);
  })
  .catch(error => {
    console.error('Error writing to JSON data:', error);
  });
}

function populateHoursDropdown() {
  const startTimeSelect = document.getElementById("start");
  const endTimeSelect = document.getElementById("end");

  for (let i = 8; i <= 16; i++) {
    const hour = i < 12 ? i : i === 12 ? i : i - 12;
    const ampm = i < 12 ? "AM" : "PM";

    const startTimeOption = document.createElement("option");
    startTimeOption.text = `${hour}:00 ${ampm}`;
    startTimeOption.value = `${hour}:00 ${ampm}`;

    const endTimeOption = document.createElement("option");
    endTimeOption.text = `${hour}:00 ${ampm}`;
    endTimeOption.value = `${hour}:00 ${ampm}`;

    startTimeSelect.appendChild(startTimeOption);
    endTimeSelect.appendChild(endTimeOption);
  }
}

populateHoursDropdown();
populateTable();
