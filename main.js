const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClearItems = document.getElementById("btnClearItems");
const btnClear = document.getElementById("btnClear");
const tblRecords = document.getElementById("tblRecords");
const sortselect = document.getElementById("sort");
const sortname = document.getElementById("sortname");
const btnsave = document.getElementById("btnsave");

let arrRecords = new Array();
const tblTHsLabels = [
  "First Name",
  "Middle Name",
  "Last Name",
  "Age",
  "Action",
];

if (arrRecords.length == 0) {
  document.getElementById("status").style.display = "inline";
  document.getElementById("status").innerHTML = "No Records...";
} else {
  document.getElementById("status").style.display = "none";
}

//get fromm loc storge
const storedRecordsJSON = localStorage.getItem("records");
if (storedRecordsJSON) {
  arrRecords = JSON.parse(storedRecordsJSON);
}
iterateRecords();

//show buttons if nay sulod loc storge
console.log("listen arrRecords");
if (arrRecords.length === 0) {
  console.log("arrRecords empty");
} else {
  console.log("arrRecords not empty");
  document.getElementById("btnClearItems").style.display = "inline";
  document.getElementById("btnsave").style.display = "inline";
  document.getElementById("labelsort").style.display = "inline";
  document.getElementById("sortname").style.display = "inline";
  document.getElementById("sort").style.display = "inline";
}

btnInsertUpdate.addEventListener("click", () => {
  const inputTxt = document.getElementsByTagName("input");

  if (btnInsertUpdate.value == "insert") {
    for (const txt of inputTxt) {
      if (txt.value == " " || txt.value == "") {
        alert("Please complete all the text inputs!");
        return;
      }
    }

    let infoRecord = {
      fname: inputTxt[0].value,
      mname: inputTxt[1].value,
      lname: inputTxt[2].value,
      age: parseInt(inputTxt[3].value),
    };

    for (const txt of inputTxt) {
      txt.value = "";
    }

    arrRecords.push(infoRecord);

    iterateRecords();
    sorting();

    console.log(inputTxt);
    console.log(infoRecord);
    console.log(arrRecords);
  } else {
    for (const txt of inputTxt) {
      if (txt.value == " " || txt.value == "") {
        alert("Please complete all the text inputs!");
        return;
      }
    }

    arrRecords[parseInt(btnInsertUpdate.value)].fname = inputTxt[0].value;
    arrRecords[parseInt(btnInsertUpdate.value)].mname = inputTxt[1].value;
    arrRecords[parseInt(btnInsertUpdate.value)].lname = inputTxt[2].value;
    arrRecords[parseInt(btnInsertUpdate.value)].age = parseInt(
      inputTxt[3].value
    );

    iterateRecords();
    sorting();

    for (const txt of inputTxt) {
      txt.value = "";
    }

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";
  }

  document.getElementById("btnClearItems").style.display = "inline";
  document.getElementById("btnsave").style.display = "inline";
  document.getElementById("labelsort").style.display = "inline";
  document.getElementById("sortname").style.display = "inline";
  document.getElementById("sort").style.display = "inline";
});

btnClear.addEventListener("click", () => {
  const inputTxt = document.getElementsByTagName("input");

  for (const txt of inputTxt) {
    txt.value = "";
  }

  btnInsertUpdate.innerHTML = "Insert";
  btnInsertUpdate.value = "insert";
});

btnClearItems.addEventListener("click", () => {
  arrRecords = [];

  while (tblRecords.hasChildNodes()) {
    tblRecords.removeChild(tblRecords.firstChild);
  }

  document.getElementById("status").style.display = "inline";
  document.getElementById("status").innerHTML = "No Records...";

  btnInsertUpdate.innerHTML = "Insert";
  btnInsertUpdate.value = "insert";

  document.getElementById("btnClearItems").style.display = "none";
  document.getElementById("btnsave").style.display = "none";
  document.getElementById("labelsort").style.display = "none";
  document.getElementById("sortname").style.display = "none";
  document.getElementById("sort").style.display = "none";

  sortselect.value = "select";
  sortname.value = "select";
  saving();
});

btnsave.addEventListener("click", () => {
  saving();
});

sortselect.addEventListener("change", () => {
  sorting();
});

sortname.addEventListener("change", () => {
  sorting();
});

function saving() {
  const arrRecordsJSON = JSON.stringify(arrRecords);
  localStorage.setItem("records", arrRecordsJSON);
}

function sorting() {
  if (sortname.value == "fname") {
    sorter("fname");
  } else if (sortname.value == "lname") {
    sorter("lname");
  }
}

function sorter(name) {
  if (sortselect.value == "asc") {
    arrRecords.sort((a, b) => {
      const nameA = a[name].toLowerCase();
      const nameB = b[name].toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  } else if (sortselect.value == "desc") {
    arrRecords.sort((a, b) => {
      const nameA = a[name].toLowerCase();
      const nameB = b[name].toLowerCase();
      if (nameA < nameB) return 1;
      if (nameA > nameB) return -1;
      return 0;
    });
  }
  iterateRecords();
}
function iterateRecords() {


  while (tblRecords.hasChildNodes()) {
    tblRecords.removeChild(tblRecords.firstChild);
  }

  if (!(arrRecords.length == 0)) {
    document.getElementById("status").style.display = "none";

    const tblHeaderRow = document.createElement("tr");
    const tblHeader = document.createElement("thead");
    tblHeaderRow.style.borderTop = "1px solid black";
    tblHeaderRow.style.borderBottom = "1px solid black";

    //Generate 4 Theads
    for (let i = 0; i < 5; i++) {
      const tblTHs = document.createElement("th");
      tblTHs.style.padding = "5px";

      if (i != 4) {
        tblTHs.style.borderRight = "1px solid black";
      }

      tblTHs.innerHTML = tblTHsLabels[i];
      tblHeaderRow.appendChild(tblTHs);
    }

    tblHeader.appendChild(tblHeaderRow);
    tblRecords.appendChild(tblHeader);

    //Generate Records
    const tblBody = document.createElement("tbody");

    arrRecords.forEach((rec, i) => {
      const tblRow = document.createElement("tr");
      const tbdataFname = document.createElement("td");
      const tbdataMname = document.createElement("td");
      const tbdataLname = document.createElement("td");
      const tbdataAge = document.createElement("td");
      const tbdataActionBtn = document.createElement("td");
      const btnDelete = document.createElement("button");
      const btnUpdate = document.createElement("button");

      tbdataFname.style.borderRight = "1px solid black";
      tbdataFname.style.padding = "10px";

      tbdataMname.style.borderRight = "1px solid black";
      tbdataMname.style.padding = "10px";

      tbdataLname.style.borderRight = "1px solid black";
      tbdataLname.style.padding = "10px";

      tbdataAge.style.borderRight = "1px solid black";
      tbdataAge.style.padding = "10px";

      tbdataActionBtn.style.padding = "10px";

      tblRow.style.borderBottom = "1px solid black";

      tbdataFname.innerHTML = rec.fname;
      tbdataMname.innerHTML = rec.mname;
      tbdataLname.innerHTML = rec.lname;
      tbdataAge.innerHTML = rec.age;

      btnDelete.innerHTML = "Delete";
      btnDelete.setAttribute("onclick", `deleteData(${i})`);
      btnDelete.style.marginRight = "5px";

      btnUpdate.innerHTML = "Edit";
      btnUpdate.setAttribute("value", "update");
      btnUpdate.setAttribute("onclick", `updateData(${i})`);
      btnUpdate.style.marginRight = "5px";

      tbdataActionBtn.appendChild(btnDelete);
      tbdataActionBtn.appendChild(btnUpdate);

      tblRow.appendChild(tbdataFname);
      tblRow.appendChild(tbdataMname);
      tblRow.appendChild(tbdataLname);
      tblRow.appendChild(tbdataAge);
      tblRow.appendChild(tbdataActionBtn);

      tblBody.appendChild(tblRow);
    });

    tblRecords.appendChild(tblBody);
  } else {
    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";
  }
}

function deleteData(i) {
  arrRecords.splice(i, 1);
  iterateRecords();
  sorting();
}

function updateData(i) {
  const inputTxt = document.getElementsByTagName("input");

  inputTxt[0].value = arrRecords[i].fname;
  inputTxt[1].value = arrRecords[i].mname;
  inputTxt[2].value = arrRecords[i].lname;
  inputTxt[3].value = arrRecords[i].age;

  btnInsertUpdate.innerHTML = "Update";
  btnInsertUpdate.value = `${i}`;
}