const homeOnload = () => {
  if (!localStorage.getItem("token")) {
    window.location.replace("/login.html");
  }
};

const roomJoinForm = document.querySelector("#room-join-form");

roomJoinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await axios.post("api/rooms", {
    name: e.target[0].value,
  });
  console.log(response);
  const room = response.data;
  window.location.replace(`/chat.html?room=${room._id}`);
});
