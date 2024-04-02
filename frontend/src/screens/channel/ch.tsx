import React, { useEffect, useState, useRef , useContext} from "react";
import { Text, View, TextInput, ScrollView, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import io from "socket.io-client";
//import { UserContext } from '../AuthContext/Usercontext';

function Channel () {

  /*const { user } = useContext(UserContext);
  const userId = user._id;

  const route = useRoute();
  const { id } = route.params; 

  const [channel, setChannel] = useState("");
  const [messages, setMessages] = useState([]);
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
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text>Channel {channel.name}</Text>
      </View>
      <ScrollView>
      {messages.length > 0 ? (
  messages.map((message, i) => (
    <View key={i} style={{ flexDirection: "row", marginVertical: 5 }}>
      <Text style={{ fontWeight: "bold" }}>{message.name}:</Text>
      <Text>{message.message}</Text>
    </View>
  ))
) : (
  <Text>No messages</Text>
)}
      </ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
        <TextInput
          style={{ flex: 1, height: 40, borderWidth: 1, borderColor: "gray", paddingHorizontal: 10 }}
          placeholder={`Say something ${user.name}!`}
          onChangeText={(text) => (messageRef.current = text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}


export default Channel