import React from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  Pressable,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
} from "react-native";
import { Feather } from "react-native-vector-icons";

const ModalPopup = ({ visible, setVisible, notification, schedule }) => {
  let children = null;
  if (notification) {
    const image = notification.request.content.data.product_image;
    var regexp = /<img[^>]+src*=s*['"]([^'"]+)['"][^>]*>/g;
    var source = regexp.exec(image);
    children = (
      <>
        <Text style={styles.modalText}>
          {notification.request.content.title}
        </Text>
        {image ? (
          <Image
            style={{ width: 200, height: 200, marginBottom: 10 }}
            source={{ uri: source[1] }}
          />
        ) : null}

        {notification.request.content.data.product_url ? (
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignContent: "space-between",
            }}
          >
            <Pressable
              style={[styles.button, styles.buttonClose, { marginRight: 5 }]}
              onPress={() => {
                schedule(notification);
                setVisible(!visible);
              }}
            >
              <Text style={styles.textStyle}>Ask Later</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                Linking.openURL(notification.request.content.data.product_url)
              }
            >
              <Text style={styles.textStyle}>Check it Out</Text>
            </Pressable>
          </View>
        ) : null}
      </>
    );
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setVisible(!visible);
      }}
    >
      {/* {children} */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setVisible(!visible)}
            >
              <Feather name="x" style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>{children}</View>

          {/* <Text style={styles.modalText}>
            {notification.request.content.title}
          </Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setVisible(!visible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // flex: 1,
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  //   iconContainer: {
  //     alignSelf: "center",
  //   },
  iconStyle: {
    fontSize: 20,
    // marginHorizontal: 15,
  },
});

export default ModalPopup;
