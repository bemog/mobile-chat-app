import { useQuery } from "@apollo/client";
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import { GET_MESSAGES } from "../queries";
import { ChatProps, Message } from "../types/index";

const Chat: FC<ChatProps> = ({ id }) => {
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { id },
  });
  const messages = data
    ? data.room.messages.map((item: Message) => {
        return {
          _id: item.id,
          text: item.body,
          createdAt: item.insertedAt,
          user: {
            _id: item.user.id,
            name: `${item.user.firstName} ${item.user.lastName}`,
            avatar: item.user.profilePic,
          },
        };
      })
    : null;

  return (
    <View style={styles.container}>
      {data && (
        <GiftedChat
          messages={messages.reverse()}
          user={{
            _id: 1,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});

export default Chat;
