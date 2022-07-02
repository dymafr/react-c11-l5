import React, { useState } from 'react';

export default function EditTodo({ todo, updateTodo, cancelEditTodo }) {
  const [value, setValue] = useState(todo.content);
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

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && value.length) {
      tryUpdateTodo({ ...todo, content: value, edit: false });
      setValue('');
    }
  }

  function handleClick() {
    if (value.length) {
      tryUpdateTodo({ ...todo, content: value, edit: false });
      setValue('');
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center mb-10">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        className="mr-15 flex-fill"
        placeholder="Ajouter une tâche"
      />
      <button onClick={handleClick} className="btn btn-primary mr-15">
        Sauvegarder
      </button>
      <button
        onClick={() => tryUpdateTodo({ ...todo, edit: false })}
        className="btn btn-reverse-primary"
      >
        Annuler
      </button>
    </div>
  );
}
