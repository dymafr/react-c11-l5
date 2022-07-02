import React from 'react';
import TodoItem from './TodoItem';
import EditTodo from './EditTodo';

export default function TodoList({ todoList, deleteTodo, updateTodo }) {
  return todoList.length ? (
    <ul>
      {todoList.map((todo) =>
        todo.edit ? (
          <EditTodo key={todo._id} todo={todo} updateTodo={updateTodo} />
        ) : (
          <TodoItem
            key={todo._id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        )
      )}
    </ul>
  ) : (
    <p>Aucune tâche en cours </p>
  );
}
