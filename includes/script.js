// In this script we should be able to
// - Verify the user with some authentication methods
// - Create information for the user that wants to sign up

// Import the configuration
// import { API_ENDPOINTS, API_KEY } from './config/config.js';

document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const signupButton = document.getElementById("signupButton");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const loginFormElement = document.getElementById("loginFormElement");
    const signupFormElement = document.getElementById("signupFormElement");

    // Show/Hide Login Form
    loginButton.addEventListener("click", () => {
        loginForm.classList.toggle("hidden");
        signupForm.classList.add("hidden");
    });

    // Show/Hide Signup Form
    signupButton.addEventListener("click", () => {
        signupForm.classList.toggle("hidden");
        loginForm.classList.add("hidden");
    });

    // Handle Login Form Submission
    loginFormElement.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const payload = {
            username,
            password
        };

        try {
            const response = await fetch("https://placeholder-api-url.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("Login Response:", data);
            alert("Login Successful");
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login Failed");
        }
    });

    // Handle Signup Form Submission
    signupFormElement.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const dob = document.getElementById("dob").value;
        const id = document.getElementById("id").value;
        const address = document.getElementById("address").value;

        const payload = {
            name,
            surname,
            dob,
            id,
            address
        };

        try {
            const response = await fetch("https://placeholder-api-url.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("Signup Response:", data);
            alert("Signup Successful");
        } catch (error) {
            console.error("Signup Error:", error);
            alert("Signup Failed");
        }
    });
});
