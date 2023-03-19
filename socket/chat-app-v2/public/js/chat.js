const socket = io();

const { room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

user = {
  username: "eren",
  _id: "eren123123123",
};

socket.on("message", (user) => {
  console.log(user);
});

socket.emit("join", user, room);
