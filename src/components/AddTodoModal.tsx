import { Button, Modal, Text, TextInput, View } from 'react-native';
import { Todo } from '../utils/types';
import { checkStringExists } from '../utils/dataUtils';

interface TodoModal {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  list: Todo[];
  setList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function AddTodoModal({
  modalVisible,
  setModalVisible,
  title,
  setTitle,
  description,
  setDescription,
  list,
  setList,
}: TodoModal) {
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
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
