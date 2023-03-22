import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const joinOrCreateRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
      navigate("/chat", { replace: true });
    }
  };

  useEffect(() => {
    const getRooms = async () => {
      const response = await axios("http://localhost:4000/api/rooms");
      setRooms(response.data);
    };
    getRooms();
  }, []);

  return (
    <div className={styles.container}>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
        <h2 style={{ color: "#333" }} ref={(_subtitle) => (subtitle = _subtitle)}>
          Create Room
        </h2>
        <form onSubmit={joinOrCreateRoom}>
          <input
            placeholder="Username"
            className={styles.input}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "1em" }}
          />
          <input
            placeholder="Room Name"
            className={styles.input}
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit" className="btn btn-third" style={{ marginTop: "2em", width: "100%" }}>
            Create
          </button>
        </form>
      </Modal>
      <div className={styles.formContainer}>
        <h1>{`CHAT APP`}</h1>
        <input className={styles.input} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

        <select className={styles.input} onChange={(e) => setRoom(e.target.value)}>
          <option disabled>-- Select Room --</option>
          {rooms.length !== 0 &&
            rooms.map((room) => (
              <option key={room._id} value={room.name}>
                {room.name.toUpperCase()}
              </option>
            ))}
        </select>

        <button className="btn btn-secondary" style={{ width: "100%" }} onClick={joinOrCreateRoom}>
          Join Room
        </button>
        <button className="btn btn-third" style={{ width: "100%" }} onClick={openModal}>
          New Room
        </button>
      </div>
    </div>
  );
};

export default Home;
