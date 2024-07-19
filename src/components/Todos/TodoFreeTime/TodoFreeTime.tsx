import { useEffect, useState } from "react";
import * as TodosApi from "../../../api_network/todos_api";
import { FreeTodo } from "../../../models/freeTodo";
import { FreeTodoInput } from "../../../api_network/todos_api";
import TodoFreeTimeInput from "./TodoFreeTimeInput";
import TodoFreeTimeList from "./TodoFreeTimeList";

const TodoFreeTime = () => {

  const [freeTodos, setFreeTodos] = useState<FreeTodo[]>([]);
  const [freeTodosLoadingError, setFreeTodosLoadingError] = useState(false);

  // Get Free Todos
  useEffect(() => {
    async function loadFreeTodos() {
        try {
            const freeTodos = await TodosApi.fetchFreeTodos();
            setFreeTodos(freeTodos);
        } catch (error) {
            console.error(error);
            setFreeTodosLoadingError(true);
        }
    }
    loadFreeTodos();
  }, []);

  // Add Free Todo
  const addFreeTodo = (newFreeTodo: FreeTodo) => {
    setFreeTodos([...freeTodos, newFreeTodo]);
  };

  // Update Free Todo
  const updateFreeTodo = async (id: string, input: FreeTodoInput) => {
    try {
      const updatedFreeTodo = await TodosApi.updateFreeTodo(id, input);
      setFreeTodos(freeTodos.map((freeTodo) => (freeTodo.id === id ? updatedFreeTodo : freeTodo)));
      return updatedFreeTodo;
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  // Delete Free Todo
  async function deleteFreeTodo(freeTodo: FreeTodo) {
    try {
      await TodosApi.deleteFreeTodo(freeTodo.id);
      setFreeTodos(freeTodos.filter(existingFreeTodo => existingFreeTodo.id !== freeTodo.id))
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // Get Free Todo (One Todo)
  async function getFreeTodo(freeTodo: FreeTodo) {
    try {
      await TodosApi.fetchFreeTodo(freeTodo.id);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div>
      <TodoFreeTimeInput addFreeTodo={addFreeTodo} />
      <TodoFreeTimeList
        freeTodos={freeTodos} 
        freeTodosLoadingError={freeTodosLoadingError} 
        deleteFreeTodo={deleteFreeTodo}
        getFreeTodo={getFreeTodo}
        updateFreeTodo={updateFreeTodo}
      />
    </div>
  )
}

export default TodoFreeTime;
