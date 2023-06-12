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
        actionsCell2.innerHTML = '<button onclick="">Change</button>';
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
