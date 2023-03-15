const registerForm = document.querySelector("#register-form");

const registerOnload = () => {
  if (localStorage.getItem("token")) {
    window.location.replace("/");
  }
};

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await axios.post("/api/users", {
    name: e.target[0].value,
    email: e.target[1].value,
    password: e.target[2].value,
  });

  if (response.status === 201) {
    localStorage.setItem("token", `Bearer ${response.data.token}`);
    window.location.replace("/");
  } else {
    console.error(response.message);
  }
});
