import React, { useState } from 'react';

export default function TodoItem({ todo, deleteTodo, updateTodo }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function tryUpdateTodo(newTodo) {
    try {
      setLoading(true);
      setError(null);
      const { _id, ...update } = newTodo;
      const reponse = await fetch(`https://restapi.fr/api/todo/${todo._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
      });
      if (reponse.ok) {
        const newTodo = await reponse.json();
        updateTodo(newTodo);
      } else {
        setError('Oops, une erreur');
      }
    } catch (e) {
      setError('Oops, une erreur');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTodo() {
    try {
      setLoading(true);
      setError(null);
      const reponse = await fetch(`https://restapi.fr/api/todo/${todo._id}`, {
        method: 'DELETE',
      });
      if (reponse.ok) {
        deleteTodo(todo);
      } else {
        setError('Oops, une erreur');
      }
    } catch (e) {
      setError('Oops, une erreur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <li
      className={
        'mb-10 d-flex flex-row justify-content-center align-items-center p-10'
      }
    >
      {loading ? (
        <span className="flex-fill">Chargement...</span>
      ) : (
        <span className="flex-fill">
          {todo.content} {todo.done && '✅'}
        </span>
      )}
      <button
        className="btn btn-primary mr-15"
        onClick={(e) => {
          e.stopPropagation();
          tryUpdateTodo({ ...todo, done: !todo.done });
        }}
      >
        Valider
      </button>
      <button
        className="btn btn-primary mr-15"
        onClick={(e) => {
          e.stopPropagation();
          tryUpdateTodo({ ...todo, edit: true });
        }}
      >
        Modifier
      </button>
      <button
        className="btn btn-reverse-primary"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTodo();
        }}
      >
        Supprimer
      </button>
    </li>
  );
}
