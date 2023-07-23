import { View, Text, Button, TextInput, TouchableOpacity, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig'
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import Icon from 'react-native-vector-icons/Octicons';
interface Todo {
    title: string,
    done: boolean,
    id: string,
}

const List = ({ navigation }: any) => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [todo, setTodo] = useState('')
    // get all todos from firestore
    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos')
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos: Todo[] = []
                snapshot.docs.forEach(doc => {
                    todos.push({
                        id: doc.id,
                        ...doc.data(),
                    } as Todo)
                })
                setTodos(todos)
            }
        })

        return () => subscriber()
    }, [])

    const addTodo = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), { title: todo, done: false })
        console.log(doc)
        setTodo('')
    }

    const renderTodo = ({ item }: { item: Todo}) => {
        const ref = doc(FIRESTORE_DB, `todos/${item.id}`)
        const toggleDone = async () => {
            updateDoc(ref, {done: !item.done})
        }
        const deleteItem = async () => {
            deleteDoc(ref)
        }
        return (
            <View className='flex flex-row justify-between items-center mx-4 my-2'>
                <TouchableOpacity className='w-8/12' onPress={toggleDone} >
                    <Text className={`text-lg ${item.done ? 'line-through' : ''}`}>{ !item.done && '🔲'}{ item.done && '✅'}  {item.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-red-500 p-2 rounded-lg" onPress={deleteItem}>
                    <Icon  name="x-circle" size={20} color="#ffffff" />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <View className='w-11/12 mx-auto mb-2'>
                <TextInput className='p-2 border-gray-300 border-2 my-4 rounded-md px-4 hover:border-blue-500' placeholder='Add new todo'
                    onChangeText={(text: string) => setTodo(text)}
                    value={todo}
                />
                <Button onPress={() => addTodo()} title='Add Todo' disabled={todo === ''} />
            </View>
            {todos.length > 0 && (
                <View className='w-11/12 mx-auto'>
                  <FlatList 
                  data={todos}
                    renderItem={renderTodo} /* FIX */
                    keyExtractor={(todo: Todo) => todo.id}
                  />
                </View>
            )}

            {/*
            <Button onPress={() => navigation.navigate('Details')} title="Open Details"></Button> */}
        </View>
    )
}

export default List