const signupLink = document.getElementById("signupLink");
if (signupLink) {
  signupLink.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Sign Up link clicked!");
    window.location.href = "./register.html";
  });
}

const loginLink = document.getElementById("loginLink");
if (loginLink) {
  loginLink.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Login link clicked!");
    window.location.href = "./index.html";
  });
}
//  validate email
function isValidEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// validate password
function isValidPassword(password) {
  return password.length >= 6;
}

// Register Page //////////////////////////////////////////////////////
function registerUser() {
  var signupName = document.getElementById("signupName").value.trim();
  var signupEmail = document.getElementById("signupEmail").value.trim();
  var signupPassword = document.getElementById("signupPassword").value.trim();
  var incorrectMessage = document.getElementById("incorrect");

  // error message
  incorrectMessage.innerText = "";

  // Validate inputs
  if (!signupName || !signupEmail || !signupPassword) {
    incorrectMessage.innerText = "All fields are required.";
    return;
  }

  if (!isValidEmail(signupEmail)) {
    incorrectMessage.innerText = "Please enter a valid email.";
    return;
  }

  if (!isValidPassword(signupPassword)) {
    incorrectMessage.innerText = "Password must be at least 6 characters.";
    return;
  }

  // localStorage
  var users = JSON.parse(localStorage.getItem("users")) || [];

  // if email already exists
  if (users.some((user) => user.email === signupEmail)) {
    incorrectMessage.innerText = "Email is already registered.";
    return;
  }

  // Add new user to list
  var newUser = {
    name: signupName,
    email: signupEmail,
    password: signupPassword,
  };
  users.push(newUser);

  // Save updated to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully!");
  // Clear input
  document.getElementById("signupName").value = "";
  document.getElementById("signupEmail").value = "";
  document.getElementById("signupPassword").value = "";
}

const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", registerUser);
}
// Login Page //////////////////////////////////////////////////////

function loginUser() {
  var signinEmail = document.getElementById("signinEmail").value.trim();
  var signinPassword = document.getElementById("signinPassword").value.trim();
  var incorrectMessage = document.getElementById("incorrect");

  //  error message
  incorrectMessage.innerText = "";

  // Validate inputs
  if (!signinEmail || !signinPassword) {
    incorrectMessage.innerText = "Both fields are required.";
    return;
  }

  // users from localStorage
  var users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email and password match
  var user = users.find(
    (user) => user.email === signinEmail && user.password === signinPassword
  );

  if (!user) {
    incorrectMessage.innerText = "Invalid email or password.";
    return;
  }

  // Store user's email in localStorage
  localStorage.setItem("currentUserEmail", signinEmail);
  window.location.href = "./home.html";
}

const signinBtn = document.getElementById("signinBtn");
if (signinBtn) {
  signinBtn.addEventListener("click", loginUser);
}

// Home Page //

//  display welcome message
function displayWelcomeMessage() {
  var currentUserEmail = localStorage.getItem("currentUserEmail");
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var usernameElement = document.getElementById("username");

  if (currentUserEmail && usernameElement) {
    var currentUser = users.find((user) => user.email === currentUserEmail);
    if (currentUser) {
      usernameElement.innerText = `Welcome ${currentUser.name}`;
    } else {
      usernameElement.innerText = "Welcome!";
    }
  }
}

window.addEventListener("DOMContentLoaded", displayWelcomeMessage);
