import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from './src/pages/TodoList';
import TodoItem from './src/pages/TodoItem';

const Stack = createNativeStackNavigator();

export interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

export default function App() {
  const [list, setList] = useState<Todo[]>([]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListPage">{(props) => <TodoList {...props} list={list} setList={setList} />}</Stack.Screen>
        <Stack.Screen name="ItemPage" initialParams={{ list, setList }}>
          {(props) => <TodoItem {...props} list={list} setList={setList} item={list[0]} index={0} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
