import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import classnames from 'classnames';
import { Todo } from '../../App';
import { AddTodoModal } from '../components/AddTodoModal';

interface TodoList {
  navigation: {
    navigate: any;
  };
  list: Todo[];
  setList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoList({ navigation: { navigate }, list, setList }: TodoList) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  return (
    <View className="flex bg-[#fff] items-center justify-center align-middle py-8">
      <Text className="bold text-lg mt-8">TODO!</Text>
      <FlatList
        data={list}
        ItemSeparatorComponent={(<Text>-----------------</Text>) as unknown as React.ComponentType<any>}
        className="max-h-96 w-10/12 border my-4 p-4 rounded"
        ListEmptyComponent={
          <View className="flex items-center justify-center">
            <Text>Empty!</Text>
          </View>
        }
        renderItem={({ item, index, separators }) => (
          <Pressable onPress={() => navigate('ItemPage', { listItem: item, index })}>
            <View className="flex flex-row justify-between">
              <Text className={classnames({ 'text-green-600': item.completed })}>{item.title}</Text>
              <View className="flex flex-row"></View>
            </View>
          </Pressable>
        )}
      />
      <Pressable onPress={() => setModalVisible(true)}>
        <Text className="text-xl">Add Todo</Text>
      </Pressable>
      <AddTodoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        list={list}
        setList={setList}
      />
      <StatusBar style="auto" />
    </View>
  );
}
