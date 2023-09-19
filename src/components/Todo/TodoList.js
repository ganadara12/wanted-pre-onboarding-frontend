import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // 아래의 코드에서 'axios.get'을 'api.get'으로 수정했습니다.
        const response = await api.get('/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Fetch todos failed:', error);
      }
    };

    fetchTodos();
  }, []);

  // ... (위의 코드는 전체 과제를 위한 시작점입니다. 필요에 따라 계속 코드를 추가해야 합니다.)
}
