import React from "react";
import {
  StyleSheet,
  Text,
  View,
  
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage
} from "react-native";
import { FAB, Portal, Dialog,Button ,Card,IconButton,Icon,TextInput,Title,Paragraph} from 'react-native-paper';

import { Avatar, Badge, withBadge } from "react-native-elements";

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: this.props.navigation.getParam("category", "no category"),
      noteArr: [],
      length: 0
    };
  }

  componentDidMount() {
    this.retrieveData();
  }
  retrieveData = async () => {
    let temp = JSON.parse(await AsyncStorage.getItem("NOTES"));
    this.setState({ noteArr: temp === null ? [] : temp });
  };

  removeNote = data => {
    let tempArr = this.state.noteArr;
    for (var i = 0; i < this.state.noteArr.length; i++) {
      if (i == data) {
        tempArr.splice(i, 1);
      }
    }
    this.storeData(tempArr);
    this.setState({ noteArr: tempArr });
  };

  storeData = arr => {
    AsyncStorage.setItem("NOTES", JSON.stringify(arr));
  };

  btnOpenGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({});
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <View >
        <Text style={{  fontSize: 20, marginTop: 20 ,textAlign:'center'}}>
          {this.state.cat}
        </Text>
        
        <ScrollView style={{  fontSize: 20, marginTop: 10 ,textAlign:'center'}}>
        {this.state.noteArr.map(
            (value, key) =>
            
              value.id === this.state.cat && (
        <Card style={styles.container}>
        <Card.Cover style={{height: 150 }} source={{ uri: value.image }} />
        <Card.Title title={value.title} />
        <Card.Content>
          <Paragraph>
          {value.description}
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => this.removeNote(key)}>Delete Note</Button>
          
        </Card.Actions>
      </Card>
              ))}
                </ScrollView>
                <Button style={styles.fab} icon="plus" mode="contained" onPress={() => {
              this.props.navigation.navigate("Note", {
                category: this.state.cat
                });}}>
    Add Note
  </Button>
              </View>
        )
        }
        }
        
          
      
           

        const styles = StyleSheet.create({
          container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            paddingBottom: 10,
          },
          
          fab: {
            position: 'absolute',
            margin: 30,
            right: 0,
            top: 500,
        },
        todoListContainer: {
           
            width:'100%',
        borderRadius: 5,
        position:'relative',
        padding: 10,
        height: 100,
        margin:10,
        
        
        },
        divider: {
            marginVertical: 15
        },
        titleButtonsContainer: {
           
            flexDirection: "column"
        },
        completedText: {
            fontSize: 10,
        color: '#fff',
        fontWeight: '300',
        },
        titleContainer:{
            fontSize: 100,
            fontWeight: '300',
            width:'100%',
        }
        });
        