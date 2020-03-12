var rowID = 0;

window.addEventListener("batterystatus", onBatteryStatus, false);

function onBatteryStatus(status) {
    alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

}

function createNewToDo() {
  var todoDictionary = {};
  var todo = prompt("To-Do", "");

  if (todo != null) {
    if (todo == "") {
      alert("To-Do can't be empty!");
    } else {
      todoDictionary = {
        check: 0,
        text: todo,
      };
      addTableRow(todoDictionary, false);
    }
  }
}

function addTableRow(todoDictionary, appIsLoading) {
  rowID += 1;
  var table = document.getElementById("dataTable");
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);

  // checkbox
  var cell1 = row.insertCell(0);
  var element1 = document.createElement("input");
  element1.type = "checkbox";
  element1.name = "chkbox[]";
  element1.checked = todoDictionary["check"];
  element1.setAttribute("onclick", "checkboxClicked()");
  cell1.appendChild(element1);

  // textbox
  var cell2 = row.insertCell(1);
  var element2 = document.createElement("input");
  element2.type = "text";
  element2.name = "txtbox[]";
  element2.size = 16;
  element2.id = "text" + rowID;
  element2.value = todoDictionary["text"];
  element2.checked = todoDictionary["check"];
  element2.setAttribute("onchange", "saveToDoList()");
  cell2.appendChild(element2);

  // view button
  var cell3 = row.insertCell(2);
  var element3 = document.createElement("input");
  element3.type = "button";
  element3.id = rowID;
  element3.value = "View";
  element3.setAttribute("onclick", "alert(document.getElementById('text' + this.id).value)");
  cell3.appendChild(element3);

  // delete button
  var cell4 = row.insertCell(3);
  var element4 = document.createElement("input");
  element4.type = "button";
  element4.value = "Delete";
  element4.setAttribute("onclick", "this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)");
  cell4.appendChild(element4);

  // update UI and save to-do
  checkboxClicked();
  saveToDoList();
  if (!appIsLoading) {
    alert("Task Added Successfully");
  }
}

function checkboxClicked() {
  var table = document.getElementById("dataTable");
  var rowCount = table.rows.length;

  for (var i = 0; i < rowCount; i++) {
    var row = table.rows[i];
    var chkbox = row.cells[0].childNodes[0];
    var textbox = row.cells[1].childNodes[0];

    if (chkbox != null && chkbox.checked) {
      if (textbox != null) {
        textbox.style.setProperty("text-decoration", "line-through");
      }
    } else {
      textbox.style.setProperty("text-decoration", "none");
    }
  }

  saveToDoList();
}

function saveToDoList() {
  var todoArray = {};

  var table = document.getElementById("dataTable");
  var rowCount = table.rows.length;

  if (rowCount != 0) {
    for (var i = 0; i < rowCount; i++) {
      var row = table.rows[i];
      var chkbox = row.cells[0].childNodes[0];
      var textbox = row.cells[1].childNodes[0];

      todoArray["row" + i] = {
        check: (chkbox != null && chkbox.checked) ? 1 : 0,
        text: textbox.value,
      };
    }
  } else {
    todoArray = null;
  }

  // use local storage
  window.localStorage.setItem("todoList", JSON.stringify(todoArray));
}

function removeCompletedTasks() {
  var table = document.getElementById("dataTable");
  var rowCount = table.rows.length;

  for (var i = 0; i < rowCount; i++) {
    var row = table.rows[i];
    var chkbox = row.cells[0].childNodes[0];
    if (chkbox != null && chkbox.checked) {
      table.deleteRow(i);
      rowCount--;
      i--;
    }
  }

  saveToDoList();
  alert("Completed Tasks Were Removed Successfully");
}

function loadToDoList() {
  // use local storage
  var listTask = JSON.parse(window.localStorage.getItem("todoList"));

  if (listTask == null || listTask == "null") {
    deleteAllRows();
  } else {
    var count = 0;
    for (var task in listTask) {
      count++;
    }

    deleteAllRows();

    for (var i = 0; i < count; i++) {
      addTableRow(listTask["row" + i], true);
    }
  }
}

function deleteAllRows() {
  var table = document.getElementById("dataTable");
  var rowCount = table.rows.length;

  for (var i = 0; i < rowCount; i++) {
    table.deleteRow(i);
    rowCount--;
    i--;
  }

  saveToDoList();
}