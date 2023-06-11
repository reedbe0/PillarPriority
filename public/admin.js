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
        row.appendChild(itemNameCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = item.date;
        row.appendChild(dateCell);

        const timeStartCell = document.createElement("td");
        timeStartCell.textContent = item.startTime;
        row.appendChild(timeStartCell);

        const timeEndCell = document.createElement("td");
        timeEndCell.textContent = item.endTime;
        row.appendChild(timeEndCell);

        const availabilityCell = document.createElement("td");
        availabilityCell.textContent = item.available
          ? "Available"
          : "Not Available";
        row.appendChild(availabilityCell);

        const actionsCell = document.createElement("tr");
        actionsCell.innerHTML = '<button onclick="">Delete</button>';
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

function submitForm(event) {
  event.preventDefault();

  var itemName = document.getElementById("addItem").value;
  var startTime = document.getElementById("start-time").value;
  var endTime = document.getElementById("end-time").value;
  var date = formatDate(new Date(startTime));
  startTime = formatTime(new Date(startTime));
  endTime = formatTime(new Date(endTime));
  available = "true"

  const newItem = {
    itemName: itemName,
    date: date,
    startTime: startTime,
    endTime: endTime,
    available: available
  };

  fetch('/write_db', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  })
  .then(response => response.text())
  .then(message => {
    console.log('Server response:', message);
    // window.location.replace('./calendar');
  })
  .catch(error => {
    console.error('Error writing to JSON data:', error);
  });

  console.log(newItem);
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
