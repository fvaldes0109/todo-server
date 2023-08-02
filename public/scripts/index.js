let currEditId;

const init = async () => {
    
    loadTable();

    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {

        event.preventDefault();

        const formData = new FormData(form);
        const title = formData.get('title');
        const description = formData.get('description');
        const status = formData.get('status') ? 'COMPLETED' : 'PENDING';
        const task = { title, description, status };

        await postTask(task);
        loadTable();
    });
}

const loadTable = async () => {

    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    
    const data = await getTasks();

    data.tasks.forEach((item) => {

        const { id, status, title, description } = item;

        const row = document.createElement('tr');
        const statusCell = document.createElement('td');
        const titleCell = document.createElement('td');
        const descriptionCell = document.createElement('td');
        const editButtonContainer = document.createElement('td');
        const deleteButtonContainer = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

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
        
        editButtonContainer.appendChild(editButton);
        editButton.innerHTML = 'Edit';
        editButton.addEventListener('click', async () => {

            currEditId = id;
            document.querySelector('.edit-window').style.visibility = 'visible';
            document.querySelector('.edit-window input').value = title;
            document.querySelector('.edit-window textarea').value = description;
            loadTable();
        });

        deleteButtonContainer.appendChild(deleteButton);
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', async () => {
            console.log('delete:', id)
            await deleteTask(id)
            loadTable();
        });

        row.appendChild(statusCell);
        row.appendChild(titleCell);
        row.appendChild(descriptionCell);
        row.appendChild(editButtonContainer);
        row.appendChild(deleteButtonContainer);

        tableBody.appendChild(row);
    });
}

const sendEdit = async () => {

    const title = document.querySelector('.edit-window input').value;
    const description = document.querySelector('.edit-window textarea').value;
    const task = { id: currEditId, title, description };
    await putTask(task);
    document.querySelector('.edit-window').style.visibility = 'hidden';
    loadTable();
}

const showError = (status, errors) => {

    document.querySelector('.error-window').style.visibility = 'visible';
    const errorsMessage = document.querySelector('.error-message');
    errorsMessage.innerHTML = '';

    errors.forEach(item => {
        
        errorsMessage.innerHTML += `<b>Status ${status}: ${item.msg}</b><br>`
    });
}

document.addEventListener('DOMContentLoaded', init);