let currEditId;
const priorities = ['Low', 'Medium', 'High'];
let currOrder = '';
let currStatus = '';

const init = async () => {
    
    const data = await getUser();
    const userField = document.querySelector('p.email');
    userField.innerHTML = data.user.email;

    loadTable();

    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {

        event.preventDefault();

        const formData = new FormData(form);
        const title = formData.get('title');
        const description = formData.get('description');
        const status = formData.get('status') ? 'COMPLETED' : 'PENDING';
        const priority = formData.get('priority');
        const task = { title, description, status, priority };

        await postTask(task);
        loadTable();
    });
}

const loadTable = async () => {

    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    
    const data = await getTasks(currOrder, currStatus);
    if (!data.tasks) data.tasks = [];

    data.tasks.forEach((item) => {

        const { id, status, title, description, priority } = item;

        const row = document.createElement('tr');
        const statusCell = document.createElement('td');
        const titleCell = document.createElement('td');
        const descriptionCell = document.createElement('td');
        const priorityCell = document.createElement('td');
        const editButtonContainer = document.createElement('td');
        const deleteButtonContainer = document.createElement('td');
        
        const checkbox = document.createElement('input');
        statusCell.appendChild(checkbox);
        checkbox.type = 'checkbox';
        checkbox.checked = status === 'COMPLETED';
        checkbox.addEventListener('change', async () => {
            
            const status = checkbox.checked ? 'COMPLETED' : 'PENDING';
            const task = { id, status };
            await putTask(task);
            loadTable();
        });
        
        titleCell.innerText = title;
        descriptionCell.innerText = description === undefined ? '' : description;
        priorityCell.innerText = priority;
        
        const editButton = document.createElement('button');
        editButtonContainer.appendChild(editButton);
        editButton.innerHTML = 'Edit';
        editButton.addEventListener('click', async () => {
            
            currEditId = id;
            document.querySelector('.edit-window').style.visibility = 'visible';
            document.querySelector('.edit-window input').value = title;
            document.querySelector('.edit-window textarea').value = description;
            document.querySelector('.edit-window select').value = priority;

            loadTable();
        });
        
        const deleteButton = document.createElement('button');
        deleteButtonContainer.appendChild(deleteButton);
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', async () => {

            await deleteTask(id)
            loadTable();
        });

        row.appendChild(statusCell);
        row.appendChild(titleCell);
        row.appendChild(descriptionCell);
        row.appendChild(priorityCell);
        row.appendChild(editButtonContainer);
        row.appendChild(deleteButtonContainer);

        tableBody.appendChild(row);
    });
}

const sendEdit = async () => {

    const title = document.querySelector('.edit-window input').value;
    const description = document.querySelector('.edit-window textarea').value;
    const priority = document.querySelector('.edit-window select').value;
    const task = { id: currEditId, title, description, priority };
    await putTask(task);
    document.querySelector('.edit-window').style.visibility = 'hidden';
    loadTable();
}

const deleteAll = async () => {

    await deleteAllTasks();
    loadTable();
}

const swapOrder = async () => {

    currOrder = (currOrder === 'desc' ? 'asc' : 'desc');

    loadTable();
}

const swapStatus = async () => {

    if (currStatus === '') currStatus = 'COMPLETED';
    else if (currStatus === 'COMPLETED') currStatus = 'PENDING';
    else currStatus = '';

    loadTable();
}

document.addEventListener('DOMContentLoaded', init);