import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './Model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App:React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>('');
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const addHandler = (e:React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([
        ...todos, 
        { id: Date.now(), todo, isDone: false },
      ]);

      setTodo('');
    }

  }

  const onDragEnd = (result:DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination?.droppableId === source.droppableId && destination?.index === source.index) return;

    let add, active = todos, complete = completedTodos;

    if (source.droppableId === 'todosListActive') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'todosListActive') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskly</span>
        <InputField 
          todo={todo} 
          setTodo={setTodo} 
          addHandler={addHandler} 
        />

        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
