const loginForm = document.querySelector("#login-form");

const loginOnload = () => {
  if (localStorage.getItem("token")) {
    window.location.replace("/");
  }
};

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await axios.post("/api/users/login", {
    email: e.target[0].value,
    password: e.target[1].value,
  });

  if (response.status === 200) {
    localStorage.setItem("user-id", response.data.user._id);
    localStorage.setItem("user-name", response.data.user.name);
    localStorage.setItem("token", `Bearer ${response.data.token}`);
    window.location.replace("/");
  } else {
    console.error(response.message);
  }
});
