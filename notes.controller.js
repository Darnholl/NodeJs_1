const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}
async function removeNotes(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((note) => note.id !== id.toString());
  // console.log(newNotes);
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  console.log(chalk.bgRed("Note was removed!"));
}
async function editNotes(id, value) {
  const notes = await getNotes();
  // console.log(notes);
  const newNotes = notes.map((note) =>
    note.id === id ? { ...note, title: value } : note
  );
  // console.log(newNotes);
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  console.log(chalk.bgRed("Note was edited!"));
}

async function printNotes() {
  const notes = await getNotes();
  notes.forEach((note) => {
    console.log(chalk.blue("Here is the list of notes:", note.id, note.title));
  });
}

module.exports = {
  addNote,
  getNotes,
  removeNotes,
  editNotes,
};
