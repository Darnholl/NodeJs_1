document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    let testPrompt = prompt("Пробуем изменить", "введи текст");
    edit(id, testPrompt)
      .then((res) => res.json())
      .then((data) => console.log(data));
    // if (testPrompt) {
    //   alert(`good ${testPrompt}`);
    // } else if (!testPrompt) {
    //   alert(`false ${typeof testPrompt}`);
    // }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}
async function edit(id, value) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(value),
  });
}
