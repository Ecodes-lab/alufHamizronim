import React, { useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";

const QuoteForm = () => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event) =>
    setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      onKeyboardHide
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);
  return (
    <View style={[styles.container, { marginBottom: keyboardOffset }]}>
      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput]}
          placeholder="Name(required)"
          placeholderTextColor="#003f5c"

          //   onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput]}
          placeholder="Telephone(required)"
          placeholderTextColor="#003f5c"
          //   secureTextEntry={true}
          //   onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput]}
          placeholder="Email(required)"
          placeholderTextColor="#003f5c"
          //   secureTextEntry={true}
          //   onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.sendBtn}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#b2ff93",
    width: "90%",
    paddingVertical: 20,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 10,
  },
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    // marginLeft: 20,
    // color: "#000",
  },
  sendBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#183884",
  },
  sendText: {
    color: "#fff",
  },
});

export default QuoteForm;
