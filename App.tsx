import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './app/screens/List';
import Details from './app/screens/Details';
import Login from './app/screens/Login';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="My Todos" component={List} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
      {/* <View className="flex w-full h-full justify-center items-center bg-slate-900">
        <Text className='text-lg text-white font-semibold'>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View> */}
    </NavigationContainer>
  );
}
