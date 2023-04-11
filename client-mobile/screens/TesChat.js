import { View, Text } from "react-native";
import React from "react";
import * as TalkRn from "@talkjs/expo";

export default function TesChat(props) {
  const me = {
    id: "2",
    name: "Zio Kandaka",
    email: "alice@example.com",
    photoUrl: "https://i.pinimg.com/564x/cd/80/4b/cd804b46abaad65369e85b527307af4d.jpg",
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  };

  const other = {
    id: "1",
    name: "User",
    email: "alice@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(TalkRn.oneOnOneId(me, other));

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  return (
    <TalkRn.Session appId="t0KJ4uWG" me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
  );
}
