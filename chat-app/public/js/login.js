const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await axios.post("/api/users/login", {
    email: e.target[0].value,
    password: e.target[1].value,
  });

  if (response.status === 200) {
    localStorage.setItem("token", `Bearer ${response.data.token}`);
    window.location.replace("/");
  } else {
    console.error(response.message);
  }
});
