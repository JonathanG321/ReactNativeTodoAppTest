import { useContext, useState } from 'react';
import { Button, Modal, Text, TextInput, View } from 'react-native';
import { checkStringExists } from '../utils/dataUtils';
import { ListContext } from '../context/ListContext';

interface TodoModal {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddTodoModal({ modalVisible, setModalVisible }: TodoModal) {
  const { list, setList } = useContext(ListContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View className="flex items-center justify-center h-full mt-22 bg-transparent-slate">
        <View className="flex items-center justify-center border p-6 rounded-lg bg-white">
          <Text className="bold text-3xl mb-6">Add New Todo</Text>
          <TextInput
            className="text-xl p-1 w-80 border rounded mb-3"
            placeholder="Title"
            onChange={(e) => setTitle(e.nativeEvent.text)}
            value={title}
          />
          <TextInput
            multiline
            className="text-xl p-1 w-80 border rounded mb-3 h-40"
            placeholder="Description"
            onChange={(e) => setDescription(e.nativeEvent.text)}
            value={description}
          />
          <Button
            title="+ Add Todo"
            onPress={() => {
              if (checkStringExists(title)) return;
              setList([...list, { title, description, completed: false }]);
              setTitle('');
              setDescription('');
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
