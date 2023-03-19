const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messsageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// // Templates
// const messageTemplate = document.querySelector("#message-template").innerHTML;
// const locationMessageTemplate = document.querySelector("#location-message-template").innerHTML;
// const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

// Options
const { room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const userId = localStorage.getItem("user-id");
const username = localStorage.getItem("user-name");
const token = localStorage.getItem("token");

const autoScroll = () => {
  const $newMessage = $messages.lastElementChild;

  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  const visibleHeight = $messages.offsetHeight;
  const containerHeight = $messages.scrollHeight;
  const scrollOffset = $messages.scrollTop + visibleHeight;
  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

socket.on("message", (message) => {
  console.log(message);
});

socket.emit("join", { userId, username, room });
