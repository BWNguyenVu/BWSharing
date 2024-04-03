function saveTokenToCookie(token) {
    document.cookie = `accessToken=${token}; path=/;`;
}

async function handleLoginResponse(response) {
    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    if (data.token) {
        saveTokenToCookie(data.token);
        // Redirect or do something else after successful login
    } else {
        // Handle error or display error message
    }
}

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        await handleLoginResponse(response);
    } catch (error) {
        console.error('Error:', error);
    }
});
