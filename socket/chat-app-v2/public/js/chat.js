const socket = io();

const { room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

user = {
  username: "eren",
};

socket.on("message", (user) => {
  console.log(user);
});

socket.emit("join", user, room);
