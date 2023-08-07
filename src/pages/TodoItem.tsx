import { StatusBar } from 'expo-status-bar';
import { Button, Text, TextInput, View } from 'react-native';
import { Todo } from '../../App';
import { useState } from 'react';
interface Props {
  item: Todo;
  setList: (arg: Todo[]) => void;
  list: Todo[];
  index: number;
}

export default function TodoItem({ item, setList, list, index }: Props) {
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
