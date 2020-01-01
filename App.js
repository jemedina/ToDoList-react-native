import React, { Component } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import { Header } from 'react-native-elements';
import TodoList from './src/components/TodoList';
import CreateItem from './src/components/CreateItem';
import TodoService from './src/services/TodoService';

class App extends Component {
  
  state = {
    loading: true,
    todoItems: []
  }

  cargarItems = () => {
      this.setState({
        loading: true
      });

      setTimeout( () => {
        
        TodoService.getItems()
          .then( res => {
            this.setState({
              todoItems: res.todoItems,
              loading: false
            })
        }, err => {
            console.log("Erro cargando la data: ", err)
        })
      }, 400)
  }

  componentDidMount() {
      this.cargarItems()
  }

  itemRemoved =(id) => {
    this.setState({
      todoItems: this.state.todoItems.filter(i => i._id !== id)
    })
  }

  render() {
    return (

      <KeyboardAvoidingView style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios'?"padding":"height"}>
        <Header
            containerStyle={{
              backgroundColor: '#666',
              justifyContent: 'space-around',
            }}
            centerComponent={{ 
              text: 'TO DO App', 
              style: { color: '#fff' }
            }} />
                
        <TodoList loadingData={this.state.loading} todoItems={this.state.todoItems} itemRemoved={this.itemRemoved}/>
        <CreateItem updateData={this.cargarItems} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;