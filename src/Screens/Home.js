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
 import CategoryClass from '../Calsses/CategoryClass'; 
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
             


<Card style={styles.todoListContainer} onPress={() => {
                    this.props.navigation.push("Category", { category: value });
                  }}>
             
                <Card.Title title={value} 
                right={(props) => {
                        return (
                            <View style={styles.titleButtonsContainer}>
                            <IconButton icon="delete" size={40} onPress={() => this.removeCategory(key)} /> 
                            </View>              
                        
      
                            );
                    }} /> 

                
                
            </Card>
            ))}
           
         
         
        
        <ScrollView style={{ position: 'absolute', top: 650 ,width:'100%'}}>
        <Card>
            <TextInput style={{width:'100%',padding:10}}
  mode='outlined'
  label="Category Title"
  onChangeText={this.textChanged}
  placeholder="Category Title"/>
   <Card.Actions>

             <Button style={{width:'50%',alignSelf: "center"}} onPress={this.addCategory}>Add New Category</Button>
            </Card.Actions>
         </Card>
         </ScrollView>
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
