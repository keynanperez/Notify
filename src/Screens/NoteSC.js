
import React, { useState, useEffect,Component } from 'react';
import { StyleSheet ,Button, Image, View, Platform } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Container, Title, Content, Icon, Right, Body, Left, Picker, Form,Textarea ,Item,Input} from "native-base";


import { Text,FAB , IconButton} from 'react-native-paper'
import noteClass from '../Calsses/NoteClass';
import { TextInput } from 'react-native-gesture-handler';

function AddNote({navigation}) {
    
    const [categoryName ,setcategoryName ] = useState('')
    const [categoryDes,setcategoryDes ] = useState('')
    const [image, setImage] = useState(null);

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    function onSaveCategory(){
        navigation.state.params.AddCategory({categoryName,categoryDes})
        navigation.goBack()
    }
        return(
            <>

           
         
           
        <View style = {styles.container}>
        
        <IconButton
                icon="close"
                size={25}
                color='black'
                onPress={() => navigation.goBack()}/>
        
           <View style={styles.titleContainer}>
           <Item>
      <TextInput style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,height:300 ,borderWidth: 1,borderRadius:30}} placeholder="Note aDescription" />
    </Item>
           
    <Item>
      <Input style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} placeholder="Note Name" />
    </Item>

    <Item>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image for that Note" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
    </Item>

    
    </View>
   
           
            <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                    label='add '
                    onPress={() => navigation}
                />
        </View>
        
        </>
    )}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            paddingVertical: 20,
            paddingHorizontal: 10
        },
        titleContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        title: {
            fontSize: 20
        },
        fab: {
            backgroundColor: '#219653',
            position: 'absolute',
            margin: 20,
            right: 0,
            bottom: 10
        },
        listTitle: {
            fontSize: 20
        }
    
    })
    
    //export default AddNote