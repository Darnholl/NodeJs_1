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
    let testPrompt = prompt("Изменим название?", "На какое? напиши здесь");
    if (testPrompt) {
      edit(id, testPrompt).then(() => {
        // event.target.closest("li").outerHTML = testPrompt;
        document.getElementById(id).textContent = testPrompt;
      });
    } else if (!testPrompt) {
      alert(`Отмена редактирования`);
    }
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
    body: JSON.stringify({ value }),
  });
}
