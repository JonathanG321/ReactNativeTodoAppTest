export interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

export type RootStackParamList = {
  TodoList: undefined;
  TodoItem: {
    item: Todo;
    index: number;
  };
};
