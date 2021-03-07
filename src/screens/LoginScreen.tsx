import { useMutation } from "@apollo/client";
import React, { FC, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import Body from "../components/Body";
import Form from "../components/Form";
import Header from "../components/Header";
import { UserContext } from "../context/UserContext";
import { LOG_IN } from "../queries/index";
import { LoginScreenProps } from "../types/index";

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const { user, handleSetUser } = useContext(UserContext);
  const [login, { data }] = useMutation(LOG_IN);

  const handleLogin = (email: string, password: string) => {
    login({
      variables: { email, password },
    });
  };

  useEffect(() => {
    if (data) {
      handleSetUser(data.user);
    }
  }, [data]);

  useEffect(() => {
    if (user.firstName) {
      navigation.navigate("Home");
    }
  });

  return (
    <View style={styles.container}>
      <Header text="Please Log In" />
      <Body>
        <Form handleLogin={handleLogin} />
      </Body>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;