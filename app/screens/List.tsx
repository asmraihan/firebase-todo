import { View, Text, Button } from 'react-native'
import React, {useEffect} from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

const List = ({ navigation }: any) => {

    // useEffect(() => {

    // }, [])
    
    const addTodo = async() => {
        const doc = addDoc(collection(FIRESTORE_DB, 'todos'),{ title : 'im a test2', done: false} )
        console.log(doc)
    }
    
    return (
        <View>
            <Button onPress={()=>addTodo()} title='Add Todo'/>
            <Button onPress={() => navigation.navigate('Details')} title="Open Details"></Button>
        </View>
    )
}

export default List