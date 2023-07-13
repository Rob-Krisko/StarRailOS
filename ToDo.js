import { useState, useEffect } from 'react';

function ToDo() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('ITEMS');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  });
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),
      title: newItem,
      completed: false
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewItem('');
  };

  const toggleTodo = (id, completed) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              />
              {todo.title}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;