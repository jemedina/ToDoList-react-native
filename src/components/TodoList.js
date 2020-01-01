import React, { Component } from 'react';
import { ActivityIndicator, ScrollView} from 'react-native';
import ListItem from './ListItem';
import Spacer from './common/Spacer';

class TodoList extends Component {
  render() {
    if(this.props.loadingData) {
      return (
        <ScrollView>
          <ActivityIndicator size="large" color="#ACF" style={{ marginTop: 200 }}/>
        </ScrollView>
      )
    } else {
      return (
        <ScrollView style={{ marginBottom: -50 }}>

          { this.renderItems() }

          <Spacer size={50}/>
          
        </ScrollView>
      )
    }
  
  }

  renderItems() {
    let itemsList = []
    this.props.todoItems.forEach( (item) => {
      itemsList.push( 

        <ListItem key={item._id} todoItem={item} itemRemoved={this.props.itemRemoved} />

      )
    })
    return itemsList;
  }

  
}

export default TodoList;