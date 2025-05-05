import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@components/Button'
import { defaultPizzaImage } from '@components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';


const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const {id} = useLocalSearchParams();
    const isUpdating = !!id;


    const resetFields = () => {
        setName('');
        setPrice('');
    };

    // here we do input validation 
    const validateInput = () => {
        setErrors('')
        if (!name) {
            setErrors("Name is required");
            return false
        }
        if (!price) {
            setErrors("Price is required");
            return false
        }
        if (isNaN(parseFloat(price))) {
            setErrors("Price is not a number");
            return false
        }

        return true;
    }


    // the image picker fnction 

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

    const onSubmit = () => {
        if (isUpdating) {
            //update
            onUpdateCreate();
        } else {
            onCreate();
        }
    }



    const onUpdateCreate = () => {
        console.warn("Creating a product");

        // here we check if the validating the data is true then we can go ahead and submit the data
        if (!validateInput()) {
            return
        }

        // save in the database
        resetFields();
    }

    const onCreate = () => {
        console.warn("Creating a product");

        // here we check if the validating the data is true then we can go ahead and submit the data
        if (!validateInput()) {
            return
        }

        // save in the database
        resetFields();
    }

    const onDelete = () => {
        console.warn("DELETE!!!");
    }

    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this product?", [
            {
                text: 'Cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete
            }
        ])
    }

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: isUpdating ? "Updating product" : "Create a product"}}/>
        <Image style={styles.image} source={{ uri: image || defaultPizzaImage }} />
        <Text onPress={pickImage} style={styles.textButton} >Select an Image</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} placeholder='Name' style={styles.input}/>

        <Text style={styles.label}>Price</Text>
        <TextInput value={price} onChangeText={setPrice} placeholder='Price' style={styles.input} keyboardType='numeric'/>

        <Text style={{ color: 'red'}}>{errors}</Text>
        <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit}/>
        {
            isUpdating && (
                <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>
            )
        }
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
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    label: {
        color: 'grey',
        fontSize: 16
    }
})

export default CreateProductScreen;