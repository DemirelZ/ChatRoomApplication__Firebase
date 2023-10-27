import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Message from "../components/Message";

const Chat = ({ room, setRoom }) => {
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    addDoc(messagesRef, {
      text,
      room,
      author: {
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
      createAt: serverTimestamp(),
    });

    e.target[0].value = "";
  };

  useEffect(() => {
    const options = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createAt", "asc")
    );

    const unsubscribe = onSnapshot(options, (snapshot) => {
      const tempData = [];

      snapshot.docs.forEach((doc) => tempData.push(doc.data()));

      setMessages(tempData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="chat">
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Change Room</button>
      </header>
      <main>
        {messages?.map((data, i) => (
          <Message key={i} data={data} />
        ))}
      </main>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="write your message..." />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Chat;
