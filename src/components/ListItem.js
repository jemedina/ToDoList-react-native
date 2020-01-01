import React, { Component } from 'react';
import { View, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import TodoService from '../services/TodoService';

class ListItem extends Component {

    state = {
        checked: this.props.todoItem.is_done,
        loading: false
    }

    changeState() {
        this.setState({
            loading: true
        })
        
        TodoService.
        setItemStatus(this.props.todoItem._id, !this.state.checked)
        .then( resp => {
            this.setState({
                checked: !this.state.checked,
                loading: false
            });
        }, err=> {
            this.setState({
                loading: false
            })
            if(this.state.checked) {
                Alert.alert(`Se produjo un error al crear tu tarea como completada`)
            } else {
                Alert.alert(`Se produjo un error al crear tu tarea como pendiente`)
            }
        });
    }

    deleteItem() {
        this.setState({
            loading: true
        });

        TodoService.deleteItem(this.props.todoItem._id)
        .then( resp => {

            this.props.itemRemoved(this.props.todoItem._id);

        }, err=> {
            this.setState({
                loading: false
            })
            Alert.alert(`Se produjo un error al borrar la tarea`)
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={this.styles.wrapper}>
                    <View style={{ flex: 1 }}>
                        <CheckBox
                            checkedColor='#555'
                            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                            title={this.props.todoItem.title}
                            checked={this.state.checked}
                            titleProps={{style: this.stylesTitle() }}
                            onPress={() => {
                                this.changeState();
                                }}
                            />
                    </View>
                    
                    { this.renderIndicator() }

                    <View style={{marginTop: 4}}>
                        <Icon
                            reverse
                            name='trash'
                            type='font-awesome'
                            color='red'
                            size={15}
                            onPress={ () => {
                                Alert.alert(
                                    '¿Seguro que decesar borrar ese item?',
                                    '',
                                    [
                                      {
                                        text: 'Nel alv',
                                        style: 'cancel',
                                      },
                                      {
                                          text: 'Simon', 
                                          onPress: () => this.deleteItem()
                                      },
                                    ],
                                    {cancelable: false},
                                  );
                            }} />
                    </View>
                </View>
            </View>
        );
    }

    renderIndicator() {
        if(this.state.loading) {
            return (
                <View style={{marginTop: 17}}>
                    <ActivityIndicator 
                        size="small" 
                        color="#CCC"
                        />
                </View>
            )
        }
    }

    stylesTitle() {
        if(this.state.checked) {
            return {
                textDecorationLine: 'line-through', textDecorationStyle: 'solid'
            }
        } else {
            return {
                textDecorationLine: 'none'
            }
        }
    }

    styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            flexDirection: 'row',
            borderColor: 'gray',
            borderWidth: 0.5,
            marginLeft: 8,
            marginRight: 8,
            marginTop: 4,
            marginBottom: 4,
            borderRadius: 10
        }
    })
}

export default ListItem;