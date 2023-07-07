const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNotes, removeNotes } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "add new note to list",
  builder: {
    title: {
      type: "",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "print all notes",
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: { type: "", describe: "Note Id", demandOption: true },
  },
  async handler({ id }) {
    removeNotes(id);
  },
});

yargs.parse();
