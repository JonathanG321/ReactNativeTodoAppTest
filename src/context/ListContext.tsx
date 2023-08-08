import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../utils/types';

export const ListContext = React.createContext({
  list: [] as Todo[],
  setList: (() => undefined) as Dispatch<SetStateAction<Todo[]>>,
});
