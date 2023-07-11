const chalk = require("chalk");
const express = require("express");
const {
  addNote,
  getNotes,
  removeNotes,
  editNotes,
} = require("./notes.controller");
const path = require("path");

const port = 3000;

const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.render("index", {
    title: " Express app",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  console.log(req.body);
  await addNote(req.body.title);
  res.render("index", {
    title: " Express app",
    notes: await getNotes(),
    created: true,
  });
});

// Редактирование
app.put("/:id", async (req, res) => {
  // console.log(req.params.id, req.body.value);
  await editNotes(req.params.id, req.body.value);
  res.render("index", {
    title: " Express app",
    notes: await getNotes(),
    created: false,
  });
});

app.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  await removeNotes(req.params.id);
  res.render("index", {
    title: " Express app",
    notes: await getNotes(),
    created: false,
  });
});

// const server = http.createServer(async (req, res) => {
//   if (req.method === "GET") {
//     const content = await fs.readFile(path.join(basePath, "index.html"));
//     // res.setHeader("Content-Type", "text/html");
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     res.end(content);
//   } else if (req.method === "POST") {
//     const body = [];
//     res.writeHead(200, {
//       "Content-type": "text/plain; charset=utf-8",
//     });

//     req.on("data", (data) => {
//       body.push(Buffer.from(data));
//     });

//     req.on("end", () => {
//       const title = body.toString().split("=")[1].replaceAll("+", " ");
//       addNote(title);
//       res.end(`Title = ${title}`);
//     });
//   }
// });

app.listen(port, () => {
  console.log(chalk.green(`server has been started on port ${port}...`));
});
