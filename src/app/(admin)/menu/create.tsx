import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Button from '@components/Button'

const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const onCreate = () => {
        console.warn("Creating a product");


        resetFields();
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} placeholder='Name' style={styles.input}/>

      <Text style={styles.label}>Price</Text>
      <TextInput value={price} onChangeText={setPrice} placeholder='Price' style={styles.input} keyboardType='numeric'/>

      <Button text='Create' onPress={onCreate}/>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    },
    label: {
        color: 'grey',
        fontSize: 16
    }
})

export default CreateProductScreen;