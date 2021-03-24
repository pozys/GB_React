import React from "react";
import ReactDOM from "react-dom";

let messages = ["Привет", "Как дела?"];
const MessageComponent = (props) => <div>{props.text}</div>;
function sendMessage() {
  messages.push("OK");
  renderAll();
}

function renderAll() {
  console.log("render");
  ReactDOM.render(
    <Form messages={messages} />,
    document.getElementById("root")
  );
}

const Form = (props) => (
  <div>
    <MessageField messages={props.messages} />
    <br />
    <button onClick={sendMessage}>Отправить</button>
  </div>
);

const MessageField = (props) => {
  return props.messages.map((message) => <MessageComponent text={message} />);
};

renderAll();
