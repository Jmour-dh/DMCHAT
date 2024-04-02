import React, { useEffect, useState, useRef , useContext} from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity , Image , Button, PermissionsAndroid,  Linking} from "react-native";
import { useRoute } from "@react-navigation/native";
import io from "socket.io-client";
import styles from "./Channel.styles";
const fleche = require('../../assets/images/fleche.png');
const photo = require('../../assets/images/photo.png');
const camera = require('../../assets/images/camera.png');
import ImagePicker, { MediaType , CameraOptions, launchCamera} from 'react-native-image-picker';

//import { UserContext } from '../AuthContext/Usercontext';

function Channel () { 

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);

  const [cameraPhoto, setCameraPhoto] = useState();


  const openCamera = async () => {

    let options:CameraOptions = {
      saveToPhotos:true,
      mediaType:'photo',
      
    };

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

       launchCamera(options, (result) => {
          if (!result.didCancel) {
            setCameraPhoto(result.assets[0].uri);
          }
          })
      } else {
        console.log('Permission denied', granted);
        Linking.openSettings();
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }

  
  };

  

  /*const { user } = useContext(UserContext);
  const userId = user._id;

  const route = useRoute();
  const { id } = route.params; 

  const [channel, setChannel] = useState("");
  const [messages, setMessages] = useState([]);*/
  const [socket, setSocket] = useState(null);
  const messageRef = useRef("");

  const sendMessage = () => {

    if (socket) {

      socket.emit("channelMessage", {
        channelId: id,
        user: userId,
        message: messageRef.current,
      });
      messageRef.current = ""; // Effacer le message après l'envoi
    }
  };
  /*

  useEffect(() => {

    const setupSocket = () => {

      if (user) {
        const newSocket = io.connect("http://localhost:8080", {
          query: {
            userId: user._id,
          },
        });

        newSocket.on("disconnect", () => {
          setSocket(null);
          setTimeout(setupSocket, 3000);
        });

        newSocket.on("connect", () => {
          console.log("Socket Connected!");
        });

        setSocket(newSocket);
      }
    };
    setupSocket();
  }, []);

  useEffect(() => {
    // Fetch channel details
    // (Utilisez votre méthode de récupération des données)
    setChannel({ name: "Channel Name" });

    // Fetch messages
    // (Utilisez votre méthode de récupération des données)
    setMessages([
      { userId: "1", name: "User1", message: "Hello" },
      { userId: "2", name: "User2", message: "Hi" },
    ]);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        setMessages([...messages, message]);
      });

      socket.emit("joinRoom", {
        channelId: id,
      });

      return () => {
        socket.emit("leaveRoom", {
          channelId: id,
        });
      };
    }
  }, [socket]);*/



  return (
    <View style={styles.mainContainer}>
  <View style={styles.header}>
    <Text style={styles.title}>Channel</Text>
  </View>
  <ScrollView>
  {messages.length > 0 ? (
    messages.map((message, i) => (
      <View key={i} style={styles.messageContainer}>
        <Text style={styles.messageUserName}>{message.name}:</Text>
        <Text style={styles.messageText}>{message.message}</Text>
      </View>
    ))
  ) : (

    <View style={styles.messageContainer}>
      <Text style={styles.noMessagesText}>No messages</Text>
      </View>    
  )}
  <View>
  {cameraPhoto && <Image source={{uri: cameraPhoto}} />}
  </View>

</ScrollView>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={`Say something ${user.name}!`}
      onChangeText={(text) => (messageRef.current = text)}
    />

    <TouchableOpacity onPress={sendMessage} style={styles.button}>
    <Image source={fleche} alt="fleche" style={{ width: 40, height: 40 }}  />
    </TouchableOpacity>

    <TouchableOpacity onPress={openCamera} style={styles.button}>
    <Image source={camera} alt="fleche" style={{ width: 40, height: 40 }}  />
    </TouchableOpacity>

  </View>
</View>
  );
}


export default Channel