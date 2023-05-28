function populateTable() {
  fetch("./db.json")
    .then((response) => response.json())
    .then((data) => {
      const itemList = document.getElementById("itemList");

      itemList.innerHTML = "";

      for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];

        const row = document.createElement("tr");

        const itemNameCell = document.createElement("td");
        itemNameCell.textContent = item.name;
        row.appendChild(itemNameCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = item.date;
        row.appendChild(dateCell);

        const timeStartCell = document.createElement("td");
        timeStartCell.textContent = item.timeStart;
        row.appendChild(timeStartCell);

        const timeEndCell = document.createElement("td");
        timeEndCell.textContent = item.timeEnd;
        row.appendChild(timeEndCell);

        const availabilityCell = document.createElement("td");
        availabilityCell.textContent = item.available
          ? "Available"
          : "Not Available";
        row.appendChild(availabilityCell);

        const actionsCell = document.createElement("td");
        actionsCell.innerHTML = '<button onclick="">Delete</button>';
        row.appendChild(actionsCell);

        itemList.appendChild(row);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function submitForm(event) {
  event.preventDefault();

  const itemName = document.getElementById("addItem").value;
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;

  const newItem = {
    name: itemName,
    date: formatDate(new Date(startTime)),
    timeStart: formatTime(new Date(startTime)),
    timeEnd: formatTime(new Date(endTime)),
    available: "true",
  };

  console.log(newItem);

  //POST request here
}

function formatDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear().toString().substr(-2); //2023 -> 23
  return month + "/" + day + "/" + year;
}

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, "0"); //3:00 -> 03:00
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return hours + ":" + minutes;
}

populateTable();
