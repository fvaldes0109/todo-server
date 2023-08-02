const getTasks = async () => {
    return fetch("http://localhost:3000/api/tasks")
        .then(response => response.json())
}

const postTask = (task) => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    }

    return fetch("http://localhost:3000/api/tasks", options)
        .then(response => response.json())
}