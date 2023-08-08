import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import classnames from 'classnames';
import { StatusBar } from 'expo-status-bar';
import { AddTodoModal } from '../components/AddTodoModal';
import { RootStackParamList } from '../utils/types';
import { ListContext } from '../context/ListContext';

type Props = NativeStackScreenProps<RootStackParamList, 'TodoList'>;

export default function TodoList({ navigation: { navigate, isFocused } }: Props) {
  const { list } = useContext(ListContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [_, setRerender] = useState(Math.random());

  useEffect(() => {
    if (isFocused) {
      setRerender(Math.random());
    }
  }, [isFocused]);

  return (
    <View className="flex bg-[#fff] items-center justify-center align-middle py-8">
      <Text className="bold text-lg mt-8">TODO!</Text>
      <FlatList
        data={list}
        ItemSeparatorComponent={(<View className="border-b my-2" />) as unknown as React.ComponentType<any>}
        className="max-h-96 w-10/12 border my-4 p-4 rounded"
        ListEmptyComponent={
          <View className="flex items-center justify-center">
            <Text>Empty!</Text>
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <Pressable onPress={() => navigate('TodoItem', { index })}>
              <View className="flex flex-row justify-between">
                <Text className={classnames({ 'text-green-600': item.completed })}>{item.title}</Text>
                <View className="flex flex-row"></View>
              </View>
            </Pressable>
          );
        }}
      />
      <Pressable onPress={() => setModalVisible(true)}>
        <Text className="text-xl">Add Todo</Text>
      </Pressable>
      <AddTodoModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <StatusBar style="auto" />
    </View>
  );
}
