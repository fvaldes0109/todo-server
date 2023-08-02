const init = async () => {
    
    loadTable();

    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const formData = new FormData(form);
        const title = formData.get("title");
        const description = formData.get("description");
        const status = formData.get("status") ? "COMPLETED" : "PENDING";
        const task = { title, description, status };

        await postTask(task);
        loadTable();
    });
}

const loadTable = async () => {

    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    
    const data = await getTasks();

    data.tasks.forEach((item) => {

        const { status, title, description } = item;
        const row = document.createElement("tr");
        const statusCell = document.createElement("td");
        const titleCell = document.createElement("td");
        const descriptionCell = document.createElement("td");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = status === "COMPLETED";
        statusCell.appendChild(checkbox);

        titleCell.innerText = title;
        descriptionCell.innerText = description === undefined ? "" : description;

        row.appendChild(statusCell);
        row.appendChild(titleCell);
        row.appendChild(descriptionCell);

        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", init);