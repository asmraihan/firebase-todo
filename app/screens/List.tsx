import { View, Text, Button, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig'
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore'

const List = ({ navigation }: any) => {

    const [todos, setTodos] = useState<any[]>([])
    const [todo, setTodo] = useState('')
    // get all todos from firestore
    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos')
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos: any[] = []
                snapshot.docs.forEach(doc =>{
                    todos.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
                setTodos(todos)
            }
        })

        return () => subscriber()
    }, [])
    
    const addTodo = async() => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'todos'),{ title : todo, done: false} )
        console.log(doc)
        setTodo('')
    }
    
    return (
        <View>
            <View className='w-11/12 mx-auto'>
                <TextInput className='p-2 border-gray-300 border-2 my-2 rounded-md px-4 hover:border-blue-500' placeholder='Add new todo'
                onChangeText={(text : string) => setTodo (text)}
                value={todo}
                /> 
                 <Button onPress={()=>addTodo()} title='Add Todo' disabled={todo === ''}/>
            </View>
            <View>
                {
                    todos.map(todo => (
                        <Text key={todo.id}>{todo.title}</Text>
                    ))

                }
            </View>
            {/*
            <Button onPress={() => navigation.navigate('Details')} title="Open Details"></Button> */}
        </View>
    )
}

export default List