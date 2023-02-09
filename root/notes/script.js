const addNewNote = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    closeBtn = popupBox.querySelector("header i"),
    popupTitle = popupBox.querySelector("header p")
addNoteBtn = popupBox.querySelector("button"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea"),
    wrapper = document.querySelector(".wrapper");

const months = ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "Novomber", "December"]

const notes = JSON.parse(localStorage.getItem('notes') || "[]");
let currentNoteIndex = -1;

const openAddNewNotePopup = () => {
    titleTag.focus();
    popupBox.classList.add("show");
}

const handleCloseBtn = () => {
    currentNoteIndex = -1;
    popupTitle.innerText = "Add a note";
    addNoteBtn.innerText = "Add note";
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
}

const getCurrentDate = () => {
    let dateObj = new Date();
    let month = dateObj.getMonth();
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
    return `${months[month]} ${day}, ${year} `
}

const handleAddNote = (event) => {
    event.preventDefault();
    const noteTitle = titleTag.value;
    const noteDesc = descTag.value;
    if (noteTitle || noteDesc) {
        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            cretedDate: getCurrentDate()
        }
        if (currentNoteIndex >= 0) {
            notes[currentNoteIndex] = noteInfo;
        }
        else {
            notes.push(noteInfo);
        }
        // saving notes to local storage
        localStorage.setItem('notes', JSON.stringify(notes));

        console.log(localStorage.getItem('testArray'),
            localStorage.getItem('testObj'))
        handleCloseBtn();
        showNotes();
    }
}

const showMenu = (elem) => {
    elem.parentElement.classList.add('show')
    document.addEventListener('click', e => {
        if (e.target.tagName != 'I' || e.target != elem)
            elem.parentElement.classList.remove('show')
    })
}

const updateNote = (noteIndex, title, description) => {
    addNewNote.click()
    popupTitle.innerText = "Update a note";
    addNoteBtn.innerText = "Update note";
    titleTag.value = title;
    descTag.value = description;
    currentNoteIndex = noteIndex;
}

const deleteNote = (noteIndex) => {
    notes.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}


function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove())
    for (let i = 0; i < notes.length; i++) {
        let note = `<li class='note'>
            <div class="details">
                <p>${notes[i].title}</p>
                <span>${notes[i].description} </span>
            </div>
            <div class="note-footer">
                <span>${notes[i].cretedDate}</span>
                <div class="settings">
                    <i onClick='showMenu(this)' class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li onclick='updateNote(${i},"${notes[i].title}","${notes[i].description}")'><i class="uil uil-pen"></i>Edit</li>
                        <li onclick='deleteNote(${i})'><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>
        `;
        addNewNote.insertAdjacentHTML("afterend", note);
    }
}

showNotes();

addNewNote.addEventListener("click", openAddNewNotePopup)
closeBtn.addEventListener("click", handleCloseBtn)
addNoteBtn.addEventListener("click", handleAddNote)