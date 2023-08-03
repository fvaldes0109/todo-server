const login = async (isCreate) => {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        const body = {
            email,
            password
        };

        const data = isCreate ? await postUser(body) : await loginUser(body);

        if (data.token) {
            localStorage.setItem('todo-token', data.token);
            window.location.href = '/home.html';
        }
    }
}

const signout = () => {

    localStorage.removeItem('todo-token');
    window.location.href = '/';
}