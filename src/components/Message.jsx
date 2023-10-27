import { auth } from "./../firebase/config";

const Message = ({ data }) => {
  console.log(data);

  if (auth.currentUser.uid === data?.author?.uid) {
    return <div className="msg-user">{data?.text}</div>;
  }

  return (
    <div className="msg-other">
      <p className="user-info">
        <img src={data?.author?.photo} />
        <span>{data?.author?.name}: </span>
      </p>

      <p className="msg-text">{data?.text}</p>
    </div>
  );
};

export default Message;
