import { useContext, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from '../utils/types';
import { ListContext } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'TodoItem'>;

export default function TodoItem({
  route: {
    params: { index, item },
  },
}: Props) {
  const { list, setList } = useContext(ListContext);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  return (
    <View className="flex-1 bg-[#fff] items-center justify-center py-8">
      <Text className="bold text-lg mt-8">{item.title}</Text>
      <Text className="bold text-lg mt-8">{item.description}</Text>
      <View className="flex flex-row">
        <Button
          onPress={() => {
            setList(
              list.map((item, i) => {
                if (i === index) {
                  return { ...item, completed: !item.completed };
                }
                return item;
              })
            );
          }}
          title="✔"
        />
        <Button
          onPress={() => {
            setList(list.filter((_, i) => i !== index));
          }}
          title="X"
        />
        <TextInput className="w-40 border" placeholder="Title" onChange={(e) => setTitle(e.nativeEvent.text)}>
          {title}
        </TextInput>
        <TextInput
          className="w-40 border"
          placeholder="Description"
          onChange={(e) => setDescription(e.nativeEvent.text)}
        >
          {description}
        </TextInput>
        <Button
          onPress={() => {
            if (
              title
                .split('')
                .filter((char) => char !== ' ')
                .join().length > 0
            ) {
              setList(list.concat([{ title, completed: false, description }]));
              setTitle('');
            }
          }}
          title="Add"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
