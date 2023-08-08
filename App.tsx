import React, { Dispatch, SetStateAction, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import TodoList from './src/pages/TodoList';
import TodoItem from './src/pages/TodoItem';
import { RootStackParamList, Todo } from './src/utils/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ListContext = React.createContext({
  list: [] as Todo[],
  setList: (() => undefined) as Dispatch<SetStateAction<Todo[]>>,
});

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
