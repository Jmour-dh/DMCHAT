import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import toast from "react-hot-toast";
//import api from "../../services/api";
import styles from './Home.styles';


const homi: React.FC = () => {

  const [channelsList, setChannelsList] = useState(null);
  const [name, setName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {

    const fetchChannels = async () => {

      try {
        const { Channels } = await api.get("/channels");

        setChannelsList(Channels);

      } catch (error) {
        console.error(error);
        toast.error("Error fetching Channels");
      }
    };
    fetchChannels();
  }, []);

  const createChannel = async (values) => {

    try {
      const res = await api.post("/channel", { name: values.name });

      if (!res.ok) throw res;
      toast.success(res.message);
      
      navigation.navigate("channel", { channelId: res.id });
    } catch (e) {
      console.error(e);
      toast.error("Error creating Channel");
    }
  };

  return (

    <View >
      <Text >CHANNELS</Text>
      <View >
        
        <Formik initialValues={{ name: "" }} onSubmit={createChannel}>

          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.textInputContainer}>
              <Text>Channel Name</Text>
              <TextInput
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                placeholder="Enter Channel name"
                style={styles.textInputStyle}
              />
              <Button onPress={createChannel} title="Create Channel" />
            </View>
          )}
        </Formik>
      </View>
      <FlatList
        data={channelsList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.textInputContainer}>
            <Text>{item.name}</Text>
            <Button
              title="JOIN ➔"
              onPress={() =>
                navigation.navigate("channel", { channelId: item._id })
              }
            />
          </View>
        )}
      />
    </View>
  );
 
};