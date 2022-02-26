import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../Model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import "./styles.css";
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem:React.FC<Props> = ({index, todo, todos, setTodos}) => {

  const [editing, setEditing] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editing]);

  const editHandler = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map((t) => t.id === id ? {...t, todo: editTodo} : t));
    setEditing(false);
  }

  const deleteHandler = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  }

  const doneHandler = (id: number) => {
    setTodos(todos.map(t => t.id === id ? {...t, isDone: !t.isDone} : t));
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form 
            className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
            onSubmit={(e) => editHandler(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {
              editing ? (
                <input 
                  ref={inputRef}
                  className='todos__single--text'
                  value={editTodo} 
                  onChange={(e) => setEditTodo(e.target.value) } 
                />
              ) : todo.isDone ? (
                <s className="todos__single--text">{todo.todo}</s>
              ): (
                <span className="todos__single--text">{todo.todo}</span>
              )
            }
            
            <div>
              <span 
                className="icon"
                onClick={() => {
                  if (!editing && !todo.isDone) {
                    setEditing(!editing);
                  }
                }}  
              ><AiFillEdit /></span>
              <span 
                className="icon" 
                onClick={() => deleteHandler(todo.id)}
              ><AiFillDelete /></span>
              <span 
                className="icon" 
                onClick={() => doneHandler(todo.id)}
              ><MdDone /></span>
            </div>
          </form>
        )
      }
    </Draggable>
  )
}

export default TodoItem;