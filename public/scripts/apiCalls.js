const domainURL = window.location.href.split('/')[0];

const getTasks = async (order) => {

    const options = {
        method: 'GET',
        headers: {
            'todo-token': localStorage.getItem('todo-token')
        },
    }

    return fetch(`${domainURL}api/tasks?order=${order}`, options)
        .then(async (response) => {
            const data = await response.json()
            if (response.status !== 200) showError(response.status, data);
            return data;
        });
}

const postTask = async (task) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'todo-token': localStorage.getItem('todo-token')
        },
        body: JSON.stringify(task)
    }

    return fetch(`${domainURL}api/tasks`, options)
        .then(async (response) => {
            const data = await response.json()
            if (response.status !== 200) showError(response.status, data);
            return data;
        });
}

const deleteTask = async (id) => {

    const options = {
        method: 'DELETE',
        headers: {
            'todo-token': localStorage.getItem('todo-token')
        },
    }

    return fetch(`${domainURL}api/tasks/${id}`, options)
        .then(async (response) => {
            const data = await response.json()
            if (response.status !== 200) showError(response.status, data);
            return data;
        });
}

const putTask = async (task) => {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'todo-token': localStorage.getItem('todo-token')
        },
        body: JSON.stringify(task)
    }

    return fetch(`${domainURL}api/tasks/${task.id}`, options)
        .then(async (response) => {
            const data = await response.json()
            if (response.status !== 200) showError(response.status, data);
            return data;
        });
}

const getUser = async (order) => {

    const options = {
        method: 'GET',
        headers: {
            'todo-token': localStorage.getItem('todo-token')
        },
    }

    return fetch(`${domainURL}api/users`, options)
        .then(async (response) => {
            const data = await response.json()
            if (response.status !== 200) showError(response.status, data);
            return data;
        });
}

const postUser = async (user) => {
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    return fetch(`${domainURL}api/users`, options)
        .then(async (response) => {
            const data = await response.json()
            if (response.status !== 200) showError(response.status, data);
            return data;
        });
}

const loginUser = async (user) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    return fetch(`${domainURL}api/auth/login`, options)
        .then(async (response) => {
            const data = await response.json()
            if (response.status !== 200) showError(response.status, data);
            return data;
        });
}

const showError = (status, data) => {

    document.querySelector('.error-window').style.visibility = 'visible';
    const errorsMessage = document.querySelector('.error-message');
    errorsMessage.innerHTML = '';

    if (data.errors) {
        data.errors.forEach(item => {
            errorsMessage.innerHTML += `<b>Status ${status}: ${item.msg}</b><br>`
        });
    }
    else if (data.msg) {
        errorsMessage.innerHTML = `<b>Status ${status}: ${data.msg}</b><br>`
    }
}