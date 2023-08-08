import { useContext, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { RootStackParamList } from '../utils/types';
import { checkStringExists } from '../utils/dataUtils';
import { ListContext } from '../context/ListContext';

type Props = NativeStackScreenProps<RootStackParamList, 'TodoItem'>;

export default function TodoItem({
  navigation,
  route: {
    params: { index },
  },
}: Props) {
  const { list, setList } = useContext(ListContext);
  const [title, setTitle] = useState(list[index].title);
  const [description, setDescription] = useState(list[index].description);
  const [completed, setCompleted] = useState(list[index].completed);

  return (
    <View className="flex-1 bg-transparent-slate items-center justify-center py-8">
      <View className="flex items-center justify-center h-full mt-22">
        <View className="flex items-center justify-center border p-6 rounded-lg bg-white">
          <Text className="bold text-3xl mb-6">Details</Text>
          <TextInput
            className="text-xl p-1 w-80 border rounded mb-3"
            onChange={(e) => setTitle(e.nativeEvent.text)}
            value={title}
          />
          <TextInput
            multiline
            className="text-xl p-1 w-80 border rounded mb-3 h-40"
            onChange={(e) => setDescription(e.nativeEvent.text)}
            value={description}
          />
          <View className="w-80 flex flex-row justify-start py-3">
            <BouncyCheckbox
              size={25}
              fillColor="green"
              isChecked={completed}
              text="Completed"
              iconStyle={{ borderColor: 'black' }}
              innerIconStyle={{ borderWidth: 2 }}
              onPress={(isChecked: boolean) => setCompleted(isChecked)}
            />
          </View>
          <View className="flex flex-row">
            <Button
              title="Update Todo"
              onPress={() => {
                if (checkStringExists(title)) return;
                const newList = [...list];
                newList[index] = { title, description, completed };
                setList(newList);
                navigation.goBack();
              }}
            />
            <Button
              onPress={() => {
                setList(list.filter((_, i) => i !== index));
                navigation.navigate('TodoList');
              }}
              title="Delete Todo"
            />
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
