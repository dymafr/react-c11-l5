import React, { useState } from 'react';

export default function AddTodo({ addTodo }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && value.length) {
      createTodo();
    }
  }

  async function createTodo() {
    try {
      setLoading(true);
      setError(null);
      const reponse = await fetch('https://restapi.fr/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: value,
          edit: false,
          done: false,
        }),
      });
      if (reponse.ok) {
        const todo = await reponse.json();
        addTodo(todo);
        setValue('');
      } else {
        setError('Oops, une erreur');
      }
    } catch (e) {
      setError('Oops, une erreur');
    } finally {
      setLoading(false);
    }
  }

  function handleClick() {
    if (value.length) {
      createTodo();
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mb-20">
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={value}
          className="mr-15 flex-fill"
          placeholder="Ajouter une tâche"
        />
        <button onClick={handleClick} className="btn btn-primary">
          {loading ? 'Chargement' : 'Ajouter'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}
