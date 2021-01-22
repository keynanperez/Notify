import React from "react";
import {
  StyleSheet,
  Text,
  View,
  
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";
import { FAB, Portal, Dialog,Button ,Card,IconButton,Icon,TextInput} from 'react-native-paper';
//import { TextInput } from "react-native-gesture-handler";
import { Image } from "react-native";
/* import CategoryClass from './Classes/NoteClass'; */
import { Avatar, Badge, withBadge } from 'react-native-elements'
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesArr: [],
      newCategory: "",
      catNotes:[],
      index:0
    };
  }
  

  componentDidMount() {
    this.retrieveData();
  }
  retrieveData = async () => {
    let tempCat = JSON.parse(await AsyncStorage.getItem("Categories"));
    this.setState({ categoriesArr: tempCat === null ? [] : tempCat});
  };

  textChanged = event => {
    this.setState({ newCategory: event });
  };
//**************************************************************************** הפונקציה שיוצרת קטגוריה חדשה */
  addCategory = () => {
    if(this.state.newCategory=="")
    {
      alert("Please insert category name!")
    }
    else
    {
    let tempCat = this.state.categoriesArr;
    tempCat.push(this.state.newCategory);
    this.storeData(tempCat);
    this.setState({ categoriesArr: tempCat });
    }
  };
//**************************************************************************** */
  storeData = arr => {
    AsyncStorage.setItem("Categories", JSON.stringify(arr));
  };

  removeCategory = data => {
    let tempArr = this.state.categoriesArr;
    for (var i = 0; i < this.state.categoriesArr.length; i++) {
      if (i == data) {
        tempArr.splice(i, 1);
      }
    }
    this.storeData(tempArr);
    this.setState({ noteArr: tempArr });
  };
//**************************************************************************** */
//**************************************************************************** */
//**************************************************************************** רנדר */
//**************************************************************************** */
//**************************************************************************** */
  render() {
    return (
     

        <ScrollView showsVerticalScrollIndicator={false}>
          
            {this.state.categoriesArr.map((value, key) => (
             


<Card onPress={() => {
                    this.props.navigation.push("Category", { category: value });
                  }}>
            <Card style={styles.todoListContainer}>
                <Card.Title title={value}
                   />                  
                     <IconButton icon="delete" size={40} onPress={() => this.removeCategory(key)} />            
            </Card>
        </Card>
            ))}
           
          
            <TextInput
  mode='outlined'
  label="Label Name"
  placeholder="Enter placeholder"
  left={
    <TextInput.Icon
      name={<Icon name="info" color="#ff0000" />} // where <Icon /> is any component from vector-icons or anything else
      onPress={() => {}}
    />
  }
/>
<FAB
               
                icon="plus"
                onPress={this.addCategory}
            />
         
        
         
        </ScrollView>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingBottom: 10
  },
  
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    top: 600,
},
todoListContainer: {
    justifyContent: 'flex-end',
    width:'100%',
borderRadius: 5,
padding: 10,
height: 150,


},
divider: {
    marginVertical: 15
},
titleButtonsContainer: {
    marginTop:50,
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
