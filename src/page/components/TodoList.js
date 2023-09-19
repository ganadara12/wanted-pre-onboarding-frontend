import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://www.pre-onboarding-selection-task.shop/todos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin', { replace: true });
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post('https://www.pre-onboarding-selection-task.shop/todos', {
        todo: newTodo
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (id, isCompleted, todoContent) => {
    try {
      await axios.put(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        todo: todoContent,
        isCompleted: !isCompleted
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !isCompleted };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleEditTodo = (id, content) => {
    setEditingTodo(id);
    setEditingContent(content);
  };

  const handleUpdateTodo = async (id, isCompleted) => {
    try {
      await axios.put(`https://www.pre-onboarding-selection-task.shop/todos/${editingTodo}`, {
        todo: editingContent,
        isCompleted: isCompleted
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedTodos = todos.map(todo => {
        if (todo.id === editingTodo) {
          return { ...todo, todo: editingContent };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditingTodo(null);
      setEditingContent('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        data-testid="new-todo-input"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button data-testid="new-todo-add-button" onClick={handleAddTodo}>추가</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleToggleTodo(todo.id, todo.isCompleted, todo.todo)}
              />
              {editingTodo === todo.id ? (
                <input
                  data-testid="modify-input"
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
              ) : (
                <span>{todo.todo}</span>
              )}
            </label>
            {editingTodo === todo.id ? (
              <>
                <button data-testid="submit-button" onClick={() => handleUpdateTodo(todo.id, todo.isCompleted)}>제출</button>
                <button data-testid="cancel-button" onClick={() => setEditingTodo(null)}>취소</button>
              </>
            ) : (
              <>
                <button data-testid="modify-button" onClick={() => handleEditTodo(todo.id, todo.todo)}>수정</button>
                <button data-testid="delete-button" onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default TodoList;
