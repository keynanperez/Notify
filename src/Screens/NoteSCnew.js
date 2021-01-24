import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import noteClass from '../Calsses/NoteClass';
import { Container, Title, Content, Icon, Right, Body, Left, Picker, Form,Textarea ,Item,Input} from "native-base";
import { FAB , IconButton} from 'react-native-paper'
//import CameraGo from './CameraGo';


export default class Note extends React.Component {
    static navigationOptions = {
        title: 'New Note',
    };

    constructor(props) {      
        super(props);
        this.state = {
            image:  null,
            title: "",
            desc: "",
            id: this.props.navigation.getParam('category', "no category"),
            noteArr: [],
            showCamera:false,
            
        }
        
    }

    componentDidMount(){     
        
        this.retrieveData();
    }

    retrieveData = async () => {
        let temp = JSON.parse(await AsyncStorage.getItem('NOTES'));
        this.setState({ noteArr: temp === null ? [] : temp })
    }

    titleChanged = (event) => {
        this.setState({ title: event })
    }

    descChanged = (event) => {
        
        this.setState({ desc: event })
    }

    btnOpenGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    btnSave = () => {
        if(this.state.titl=="" || this.state.desc=="")
        {alert("Error: title or description is empty")}
        else{
        let newNote = new noteClass(this.state.id, this.state.title, this.state.desc, this.state.image);
        let tempArr = this.state.noteArr;
        tempArr.push(newNote);
        this.storeData(tempArr);
        this.setState({ noteArr: tempArr });
  
        alert("Saved!")
        this.props.navigation.navigate('Home');         
    }
    }

    storeData = (arr) => {   
        AsyncStorage.setItem('NOTES', JSON.stringify(arr));
    }
    setCamera = ()=>{
        this.setState({showCamera:true})
    }
    getImage=(imageUri)=>{
        this.setState({
            image:imageUri,
            showCamera:false
        })
    }
    render() {
        let { image,showCamera } = this.state;
        if (showCamera) {
            return (<CameraGo getImage={this.getImage} />)
        }
        return (
            <View style={styles.container}>
                <Text style={{ color: 'black', fontSize: 28, margin: 15, alignItems: 'center', justifyContent: 'center',textAlign:'center' }}>New Note</Text>
                <ScrollView style={styles.container}>
                    <View style={{ flexDirection: "row", marginBottom: 30 }}>
                       
                        
                        <TextInput placeholder="Note Title" style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 40,  borderWidth: 1, width: 200,borderRadius:30,margin:10,padding:10  }} onChangeText={text=>this.titleChanged(text)}></TextInput>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,margin:10 }}>
                        <Text style={{ fontSize: 20}}>Description</Text>
                        <TextInput style={{ height: 200, borderColor: 'gray', borderWidth: 1,paddingTop:0,borderRadius:30,margin:10,width:300 }} onChangeText={text=>this.descChanged(text)}></TextInput>
                    </View>
                    <View style={styles.Content}>
                       
                        

                       
                        
                        
                        
                        

                  
                        
          <Item>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,margin:10 }}>
      <Button title="Pick an image for that Note" onPress={this.btnOpenGallery} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
    </Item>
                        {image &&
                            <Image source={{ uri: image }} style={{ height: 200, alignSelf: "center" }} />}
                    </View>
                    <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                    label='add '
                    onPress={this.btnSave}
                />

                </ScrollView>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign:'center',
        backgroundColor: '#fff',
        
       
    },
    fab: {
      backgroundColor: '#219653',
      position: 'relative',
      margin: 20,
      right: 0,
      bottom: 10
  },
});