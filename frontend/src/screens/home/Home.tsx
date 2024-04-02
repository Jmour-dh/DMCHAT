import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList,SafeAreaView, Pressable, Alert, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
//import api from "../../services/api";
import styles from './Home.styles';
//import toast from "react-hot-toast";


const Home: React.FC = () => {

  const [channelsList, setChannelsList] = useState(null);
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);


  const createChannel = async (values) => {
    try {
      /*const res = await api.post("/channel", { name: values.name });

      if (!res.ok) throw res;
      toast.success(res.message);*/
      
      navigation.navigate('Channel');

    } catch (e) {
      console.error(e);
      //toast.error("Error creating Channel");
    }
  };

  return (

    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleTextStyle}>ALL CHANNELS</Text>
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
        <View style={styles.bottomContainer}>
      <View style={styles.centeredView}>
      <Pressable
        style={[styles.button]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.signInButtonTextStyle}>+</Text>
      </Pressable>
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>New Channel</Text>
            <Formik initialValues={{ name: "" }} onSubmit={createChannel}>
              {({ handleChange, handleSubmit, values }) => (
                <View style={styles.textInputContainer}>
                  <TextInput
                    onChangeText={handleChange("name")}
                    value={values.name}
                    placeholder="Enter Channel name"
                    style={styles.textInputStyle}
                  />
                  <Pressable
                    style={ styles.signInButtonStyle}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textStyle}>Créer la Channel</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>

        </View>
  
      </View>
    </SafeAreaView>
      
  );
 
};

export default Home;
