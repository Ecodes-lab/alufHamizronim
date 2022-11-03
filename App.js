import Constants from "expo-constants";
// import * as Linking from 'expo-linking';
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeApp } from "firebase/app";
// // import {
// //   getDatabase,
// //   get,
// //   ref,
// //   onValue,
// //   set,
// //   update,
// //   push,
// // } from "firebase/database";
// import * as fb from "firebase";
import database, { firebase } from "./firebase";
// import * as messaging from "firebase/messaging";
// import { getMessaging, onMessage } from "firebase/messaging";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import HomeScreen from "./src/screens/HomeScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";

import { ProductProvider } from "./src/context/ProductContext";
import ModalPopup from "./src/components/ModalPopup";
// import { OpenURLButton } from "./src/components/Linking";
// import { set } from "react-native-reanimated";

const Stack = createNativeStackNavigator();

// const OpenURLButton = ({ url, children }) => {
// const handlePress = useCallback(async () => {
//   // Checking if the link is supported for links with custom URL scheme.
//   const supported = await Linking.canOpenURL(url);

//   if (supported) {
//     // Opening the link with some app, if the URL scheme is "http" the web link should be opened
//     // by some browser in the mobile
//     await Linking.openURL(url);
//   } else {
//     Alert.alert(`Don't know how to open this URL: ${url}`);
//   }
// }, [url]);

//   return <Button title={children} onPress={handlePress} />;
// };

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // // Initialize Firebase
    // const firebaseConfig = {
    //   // apiKey: "AIzaSyBq0t2MShV5ZYbU5pI31ATu7Yl0zJFkreo",
    //   // authDomain: "test-6e23c.firebaseapp.com",
    //   // databaseURL: "https://test-6e23c-default-rtdb.firebaseio.com/",
    //   // projectId: "test-6e23c",
    //   // storageBucket: "project-id.appspot.com",
    //   // messagingSenderId: "sender-id",
    //   // appId: "app-id",
    //   // measurementId: "G-measurement-id",

    //   apiKey: "AIzaSyBq0t2MShV5ZYbU5pI31ATu7Yl0zJFkreo",
    //   authDomain: "test-6e23c.firebaseapp.com",
    //   databaseURL: "https://test-6e23c-default-rtdb.firebaseio.com/",
    //   projectId: "test-6e23c",
    //   storageBucket: "test-6e23c.appspot.com",
    //   messagingSenderId: "1012705952654",
    //   appId: "1:1012705952654:web:b16a46f9050c15c468dadf",
    //   measurementId: "G-7Q4XPS9VFN",
    // };
    firebase();
    // initializeApp(firebaseConfig);

    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      // if (expoPushToken) {
      storeToken(token);
      // }
    });

    // const messaging = getMessaging();
    // onMessage(messaging, (payload) => {
    //   console.log("Message received. ", payload);
    // });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
        if (!modalVisible) {
          setModalVisible(true);
        }
        // Linking.openURL(response.notification.request.content.data.product_url);
        // Alert.alert(
        //   response.notification.request.content.title,
        //   response.notification.request.content.body,
        //   [
        //     {
        //       text: "Cancel",
        //       onPress: () => console.log("Cancel Pressed"),
        //       style: "cancel",
        //     },
        //     {
        //       text: "Check it Out",
        //       onPress: () => {
        //         Linking.openURL(
        //           response.notification.request.content.data.product_url
        //         );
        //         // <OpenURLButton url={response.notification.request.content.body}>
        //         //   {response.notification.request.content.body}
        //         // </OpenURLButton>;
        //       },
        //     },
        //   ]
        // );
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    // <ModalPopup
    // // visible={modalVisible}
    // // setVisible={setModalVisible(true)}
    // ></ModalPopup>;
    if (notification) {
      setModalVisible(true);

      //   Alert.alert(
      //     notification.request.content.title,
      //     notification.request.content.body,
      //     [
      //       {
      //         text: "Cancel",
      //         onPress: () => console.log("Cancel Pressed"),
      //         style: "cancel",
      //       },
      //       {
      //         text: "Check it Out",
      //         onPress: () => {
      //           Linking.openURL(notification.request.content.data.product_url);
      //         },
      //       },
      //     ]
      //   );
    }
    // sendPushNotification(expoPushToken);
    // console.log(notification && notification.request.content.title);
  }, [notification]);

  // const sources = html.match(/<img [^>]*src="[^"]*"[^>]*>/gm).map(x => x.replace(/.*src="([^"]*)".*/, '$1'));
  return (
    <NavigationContainer>
      {notification ? (
        <ModalPopup
          visible={modalVisible}
          setVisible={setModalVisible}
          notification={notification}
          schedule={(notification) => schedulePushNotification(notification)}
        />
      ) : null}
      {/* <ModalPopup visible={true} setVisible={setModalVisible} /> */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#b2ff93",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "אלוף המזרונים" }}
        />
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{ title: "מוצרים" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: "פירוט המוצר" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

async function schedulePushNotification(notification) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: notification.request.content.title,
      body: notification.request.content.body,
      data: notification.request.content.data,
    },
    trigger: { seconds: 60 },
  });
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

async function storeToken(token) {
 
  const userId = uuidv4();
  const db = database.getDatabase();
  // const reference = database.ref(db, "tokens");
  // const newTokenRef = database.push(reference);

  try {
    await AsyncStorage.getItem("@user")
      .then(async (value) => {
        // console.log(value);
        if (value !== null) {
          return value;
        } else {
          return await AsyncStorage.setItem("@user", userId).then(
            async (value) => {
              return await AsyncStorage.getItem("@user").then((value) => {
                return value;
              });
            }
          );
        }
      })
      .then((value) => {
        console.log(value);

        const reference = database.ref(db, value);

        database.set(reference, {
          token: token,
        });
      });
  } catch (e) {
    // error reading value
  }

 
}

export default () => {
  return (
    <ProductProvider>
      <App />
    </ProductProvider>
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
