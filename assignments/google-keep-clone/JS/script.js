const title = document.querySelector("#title-input");
const notes = document.querySelector("#notes-textarea");
const addBtn = document.querySelector("#addBtn");
const deleteBtn = document.querySelector("#deleteBtn");

const inputContainer = document.querySelector("#input-container");
const outputContainer = document.querySelector("#output-container-1");
const archiveContainer = document.querySelector("#output-container-2");

showTask();
showArchive();

addBtn.addEventListener("click", addTask);




// <======== Complete-Task Section ========>

function addTask() {
    if (notes.value == "") {
        alert("Please Enter the Value in Notes Section");
        return;
    }
    else {
        const newDiv = document.createElement("div");
        newDiv.classList.add("output");
        newDiv.innerHTML = `<h2>${title.value == "" ? "Note" : title.value}</h2>
        <p>${notes.value}</p>
        <div class="btn-group">
            <button id="archiveBtn">Archive</button>
            <button id="deleteBtn">Delete</button>
        </div>`


        let library = localStorage.getItem("library");
        if (library === null) {
            library = [];
        }
        else {
            library = JSON.parse(library);
        }

        const libraryObj = {
            title: title.value == "" ? "Note" : title.value,
            notes: notes.value
        }
        library.push(libraryObj);
        localStorage.setItem("library", JSON.stringify(library));


        outputContainer.appendChild(newDiv);
        title.value = "";
        notes.value = "";
        showTask();
    }
}


function deleteTask(index) {
    let library = localStorage.getItem("library");

    if (library === null) {
        return;
    }
    else {
        library = JSON.parse(library);
    }

    library.splice(index, 1);
    localStorage.setItem("library", JSON.stringify(library));
    showTask();
}


function showTask() {
    let libraryHTML = "";
    let library = localStorage.getItem("library");

    if (library === null) {
        return;
    }
    else {
        library = JSON.parse(library);
    }

    for (let i = 0; i < library.length; i++) {
        libraryHTML += `<div class="output">
        <h2>${library[i].title}</h2>
        <p>${library[i].notes}</p>
        <div class="btn-group">
            <button id="archiveBtn" onclick="archiveTask(${i})">Archive</button>
            <button id="deleteBtn" onclick="deleteTask(${i})">Delete</button>
        </div>
        </div>`
    }

    outputContainer.innerHTML = libraryHTML;
}




// <======== Complete Archive Section ========>

function archiveTask(index) {
    let archiveHTML = "";
    let library = localStorage.getItem("library");

    if (library === null) {
        return;
    }
    else {
        library = JSON.parse(library);
    }

    archiveHTML += `<div class="output">
        <h2>${library[index].title}</h2>
        <p>${library[index].notes}</p>
        <div class="btn-group">
            <button id="archiveBtn" onclick="unarchiveTask(${index})">Unarchive</button>
            <button id="deleteBtn" onclick="deleteArchive(${index})">Delete</button>
        </div>
        </div>`

    archiveContainer.innerHTML = archiveHTML;
    deleteTask(index);


    let archiveLibrary = localStorage.getItem("archive");
    if (archiveLibrary === null) {
        archiveLibrary = [];
    }
    else {
        archiveLibrary = JSON.parse(archiveLibrary);
    }

    const archiveObj = {
        title: library[index].title,
        notes: library[index].notes
    }
    archiveLibrary.push(archiveObj);
    localStorage.setItem("archive", JSON.stringify(archiveLibrary));
    showArchive();
}


function deleteArchive(index) {
    let archiveLibrary = localStorage.getItem("archive");

    if (archiveLibrary === null) {
        return;
    }
    else {
        archiveLibrary = JSON.parse(archiveLibrary);
    }

    archiveLibrary.splice(index, 1);
    localStorage.setItem("archive", JSON.stringify(archiveLibrary));
    showArchive();
}


function showArchive() {
    let archiveHTML = "";
    let archiveLibrary = localStorage.getItem("archive");

    if (archiveLibrary === null) {
        return;
    }
    else {
        archiveLibrary = JSON.parse(archiveLibrary);
    }

    for (let i = 0; i < archiveLibrary.length; i++) {
        archiveHTML += `<div class="output">
        <h2>${archiveLibrary[i].title}</h2>
        <p>${archiveLibrary[i].notes}</p>
        <div class="btn-group">
            <button id="archiveBtn" onclick="unarchiveTask(${i})">Unarchive</button>
            <button id="deleteBtn" onclick="deleteArchive(${i})">Delete</button>
        </div>
        </div>`
    }

    archiveContainer.innerHTML = archiveHTML;
}


function unarchiveTask(index) {
    let unarchiveHTML = "";
    let archiveLibrary = localStorage.getItem("archive");
    if (archiveLibrary === null) {
        return;
    }
    else {
        archiveLibrary = JSON.parse(archiveLibrary);
    }

    unarchiveHTML += `<div class="output">
        <h2>${archiveLibrary[index].title}</h2>
        <p>${archiveLibrary[index].notes}</p>
        <div class="btn-group">
            <button id="archiveBtn">Archive</button>
            <button id="deleteBtn">Delete</button>
        </div>
        </div>`

    outputContainer.innerHTML = unarchiveHTML;

    let library = localStorage.getItem("library");
    if (library === null) {
        library = [];
    }
    else {
        library = JSON.parse(library);
    }

    const libraryObj = {
        title: archiveLibrary[index].title,
        notes: archiveLibrary[index].notes
    }
    library.push(libraryObj);
    localStorage.setItem("library", JSON.stringify(library));

    deleteArchive(index);
    showTask();
}




// <======== Complete-Navigation Section ========>

const NotesSection = document.querySelector("#notes-btn");
const archiveSection = document.querySelector("#archive-btn");

NotesSection.addEventListener("click", () => {
    NotesSection.classList.add("active");
    archiveSection.classList.remove("active");

    outputContainer.classList.remove("active");
    archiveContainer.classList.add("active");

    inputContainer.classList.remove("active");
})

archiveSection.addEventListener("click", () => {
    archiveSection.classList.add("active");
    NotesSection.classList.remove("active");

    outputContainer.classList.add("active");
    archiveContainer.classList.remove("active");

    inputContainer.classList.add("active");
})