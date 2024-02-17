const inputBox = document.querySelector('.input');
const addButton = document.querySelector('.addBtn');

const notesListWrapper = document.querySelector('.notes-list-wrapper');
const errorMessageText = document.querySelector('.error-message-text');
let notesList = [];
let currentEditNote = null;

const createNewNoteItem = (getCurrentNote) => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = getCurrentNote;
    li.appendChild(p);

    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('btn', 'editBtn');
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('btn', 'deleteBtn');
    li.appendChild(deleteBtn);

    return li;
}

//save notes to localStorage
const saveNotesTostorage = (getCurrentNote) => {
    if(localStorage.getItem('notes') === null) {
        notesList.length = 0;
    } else {
        notesList = JSON.parse(localStorage.getItem('notes'));
    }
    notesList.push(getCurrentNote);
    localStorage.setItem('notes', JSON.stringify(notesList));
}


//creating add new notes
const addNewNote = () => {
    const extractInputText = inputBox.value.trim();

    if(extractInputText.length <= 0 ) {
        errorMessageText.textContent = "Input cannot be empty";
        return false;
    }

    if(addButton.innerText === "Edit Note") {
            handleEditCurrentNote(currentEditNote.target.previousElementSibling.innerHTML); 
            currentEditNote.target.previousElementSibling.innerHTML = extractInputText;
            addButton.innerText = 'Add Note';
            addButton.style.backgroundColor = 'yellow';
            currentEditNote.target.style.backgroundColor = 'yellow';
            inputBox.value = '';
        } else {
        notesListWrapper.appendChild(createNewNoteItem(extractInputText));
        inputBox.value = "";
        errorMessageText.textContent = "";
    
        saveNotesTostorage(extractInputText);
    }
}

const fetchAllNotes = () => {
    if(localStorage.getItem("notes") === null) {
        notesList.length = 0;
    } else {
        notesList = JSON.parse(localStorage.getItem('notes'));
    }

    notesList.forEach(element => {
        notesListWrapper.appendChild(createNewNoteItem(element));
    });
}

const handleEditCurrentNote = (currentNote) => {
    let notes = JSON.stringify(localStorage.getItem('notes'));
    let index = notes.indexOf(currentNote);

    notes[index] = currentNote.value;
    
    localStorage.setItem("notes", JSON.stringify(notes))
}

const handleDeleteNotes = (currentNote) => {
    if(localStorage.getItem("notes") === null) {
        notesList.length = 0;
    } else {
        notesListItems = JSON.parse(localStorage.getItem('notes'));
    }

    let currentNoteText = currentNote.children[0].innerHTML;
    let index = notesList.indexOf(currentNoteText);

    notesList.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesList));
}

const handleEditDeleteNode = (event) => {
    if(event.target.nodeName === 'BUTTON') {
        if(event.target.classList.contains('deleteBtn')) {
           notesListWrapper.removeChild(event.target.parentElement);
           handleDeleteNotes(event.target.parentElement);
        }

        if(event.target.classList.contains('editBtn')) {
            inputBox.value = event.target.previousElementSibling.innerHTML;
            inputBox.focus();
            addButton.innerText = "Edit Note";
            addButton.style.backgroundColor = 'salmon';
            currentEditNote = event;
            event.target.style.backgroundColor = 'red';
        }
    }
}


document.addEventListener('DOMContentLoaded', fetchAllNotes);
addButton.addEventListener('click', addNewNote);
notesListWrapper.addEventListener('click', handleEditDeleteNode);