import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from './src/pages/TodoList';
import TodoItem from './src/pages/TodoItem';
import { RootStackParamList, Todo } from './src/utils/types';
import { ListContext } from './src/context/ListContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [list, setList] = useState<Todo[]>([]);

  return (
    <ListContext.Provider value={{ list, setList }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TodoList">
          <Stack.Screen name="TodoList" component={TodoList} options={{ title: 'List' }} />
          <Stack.Screen name="TodoItem" component={TodoItem} options={{ title: 'Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ListContext.Provider>
  );
}
