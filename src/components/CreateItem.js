import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';
import { Icon  } from 'react-native-elements';
import TodoService from '../services/TodoService';

class CreateItem extends Component {
    state = {
        newTitle: ''
    };

    createTodoItem() {
        if(this.state.newTitle.trim().length > 0) {
            
            TodoService.addItem(this.state.newTitle)
            .then( resp => {
                Alert.alert(`Tu tarea "${this.state.newTitle}" ha sido creada`)
                this.setState({
                    newTitle: ''
                })
                this.props.updateData()
            }, err=> {
                Alert.alert(`Se produjo un error al crear la tarea`)
            });
        }
    }

    render() {
        return (
            <View style={ this.styles.container }>
                <TextInput
                    ref={(input) => { 
                        this.textInput = input; }}
                    style={ this.styles.textInput}
                    placeholder="Ingresa un To Do ..."
                    value={this.state.newTitle}
                    onChangeText={(newTitle)=>this.setState({newTitle})}
                    />
                <View style={ this.styles.button}>
                    <Icon
                        name='plus'
                        type='font-awesome'
                        color='#ACF'
                        raised
                        onPress={() => this.createTodoItem() } />
                </View>
            </View>
        );
  }

  styles = StyleSheet.create({
      container: {
          height: 80,
          backgroundColor: '#EEE',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          flexDirection: 'row',
      },

      textInput: {
          borderRadius: 50,
          height: 40, 
          backgroundColor: '#FFF',
          paddingLeft: 10,
          flex: 1
      },

      button: {
          marginTop: -12,
          marginLeft: 5,
          marginRight: -10
      }
  })
}

export default CreateItem;