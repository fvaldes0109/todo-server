const getTasks = async () => {
    return fetch('http://localhost:3000/api/tasks')
        .then(response => response.json())
}

const postTask = async (task) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }

    return fetch('http://localhost:3000/api/tasks', options)
        .then(response => response.json())
}

const deleteTask = async (id) => {

    const options = {
        method: 'DELETE'
    }

    return fetch(`http://localhost:3000/api/tasks/${id}`, options)
        .then(response => response.json())
}

const putTask = async (task) => {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }

    return fetch(`http://localhost:3000/api/tasks/${task.id}`, options)
        .then(response => response.json())
}