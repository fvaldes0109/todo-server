const serverURL = 'http://localhost:3000';

const getTasks = async () => {
    return fetch(`${serverURL}/api/tasks`)
        .then(async (response) => {
            const data = await response.json()
            if (response.status !== 200) showError(response.status, data.errors);
            return data;
        })
}

const postTask = async (task) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }

    return fetch(`${serverURL}/api/tasks`, options)
        .then(async (response) => {
            const data = await response.json()
            if (response.status !== 200) showError(response.status, data.errors);
            return data;
        })
}

const deleteTask = async (id) => {

    const options = {
        method: 'DELETE'
    }

    return fetch(`${serverURL}/api/tasks/${id}`, options)
        .then(async (response) => {
            const data = await response.json()
            if (response.status !== 200) showError(response.status, data.errors);
            return data;
        })
}

const putTask = async (task) => {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }

    return fetch(`${serverURL}/api/tasks/${task.id}`, options)
        .then(async (response) => {
            const data = await response.json()
            if (response.status !== 200) showError(response.status, data.errors);
            return data;
        })
}