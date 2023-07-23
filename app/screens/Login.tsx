import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth()
    const signUp = async () => {
       const after = await createUserWithEmailAndPassword(auth, email, password)
       console.log(after)
       alert('Account created successfully')
    }
    const signIn = async () => { 
        const user = await signInWithEmailAndPassword(auth, email, password)
        console.log(user)
    }

    return (
        <View className='flex flex-col justify-center items-center w-full h-full'>
            <View className='w-11/12 mx-auto mb-2 '>
                {/* <Text className='text-2xl font-semibold text-center mb-4'>Please Login</Text> */}
                <Text className='p-2'>Enter your email address</Text>
                <TextInput className='p-2 border-gray-300 border-2 mb-2 rounded-md px-4 hover:border-blue-500' placeholder='Email'
                    value={email}
                    onChangeText={(text: string) => setEmail(text)}
                />
                <Text className='p-2'>Enter your password</Text>
                <TextInput className='p-2 border-gray-300 border-2 mb-2 rounded-md px-4 hover:border-blue-500' placeholder='Password'
                    textContentType='password'
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}
                />
                <TouchableOpacity className="bg-orange-500 p-3 rounded-lg mt-4" onPress={signUp}>
                    <Text className='text-center text-white font-semibold '>Create account</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-blue-500 p-3 rounded-lg mt-4" onPress={signIn}>
                    <Text className='text-center text-white font-semibold '>Sign in</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Login