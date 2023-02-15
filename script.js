const btn = document.querySelector(".btn");
const notes = document.querySelector(".notes-container");


getNotes().forEach(note => {
	const noteValue = createNoteEl(note.id, note.content);
	notes.insertBefore(noteValue, btn)
})

addNote()

function createNoteEl(id, content) {
	const element = document.createElement("textarea");
	element.classList.add("note")
	element.value = content;
	element.placeholder = "Empty" 

	element.addEventListener("input", () => {
		updateContent(id, element.value)
	})

	element.addEventListener("dblclick", () => {
		if(confirm("Delete this note?")){
			removeNotes(id, element)
		}
	})

return element;	
}

function removeNotes(id, element){
	const newNotes = getNotes().filter(note => note.id !== id);
	notes.removeChild(element)
	saveNotes(newNotes)
}

function updateContent(id, content){
	const notes = getNotes()
	const target = notes.filter(note => note.id === id)[0]
	target.content = content;
	saveNotes(notes)

}

function addNote() {
	const notesArr = getNotes();
	const noteOjb = {
		id: Math.floor(Math.random() * 10000),
		content: "" 
	}

	const noteEl = createNoteEl(noteOjb.id, noteOjb.content);
	notes.insertBefore(noteEl, btn);

	notesArr.push(noteOjb);
	saveNotes(notesArr);
}

function saveNotes(note) {
	localStorage.setItem("notesList", JSON.stringify(note))
}

function getNotes() {
	return JSON.parse(localStorage.getItem("notesList") || "[]");
}

btn.addEventListener("click", addNote)