import { useEffect, useState } from "react";
import * as TodosApi from "../../../api_network/todos_api";
import { HomeTodo } from "../../../models/homeTodo";
import TodoHomeInput from "./TodoHomeInput";
import TodoHomeList from "./TodoHomeList";
import { HomeTodoInput } from "../../../api_network/todos_api"

const TodoHome = () => {

  const [homeTodos, setHomeTodos] = useState<HomeTodo[]>([]);
  const [homeTodosLoadingError, setHomeTodosLoadingError] = useState(false);

  // Get Home Todos
  useEffect(() => {
    async function loadHomeTodos() {
        try {
            const homeTodos = await TodosApi.fetchHomeTodos();
            setHomeTodos(homeTodos);
        } catch (error) {
            console.error(error);
            setHomeTodosLoadingError(true);
        }
    }
    loadHomeTodos();
  }, []);

  // Add Home Todo
  const addHomeTodo = (newHomeTodo: HomeTodo) => {
    setHomeTodos([...homeTodos, newHomeTodo]);
  };

  // Update Home Todo
  const updateHomeTodo = async (id: string, input: HomeTodoInput) => {
    try {
      const updatedHomeTodo = await TodosApi.updateHomeTodo(id, input);
      setHomeTodos(homeTodos.map((homeTodo) => (homeTodo.id === id ? updatedHomeTodo : homeTodo)));
      return updatedHomeTodo;
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  // Delete Home Todo
  async function deleteHomeTodo(homeTodo: HomeTodo) {
    try {
      await TodosApi.deleteHomeTodo(homeTodo.id);
      setHomeTodos(homeTodos.filter(existingHomeTodo => existingHomeTodo.id !== homeTodo.id))
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // Get Home Todo (One Todo)
  async function getHomeTodo(homeTodo: HomeTodo) {
    try {
      await TodosApi.fetchHomeTodo(homeTodo.id);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div>
      <TodoHomeInput addHomeTodo={addHomeTodo} />
      <TodoHomeList
        homeTodos={homeTodos} 
        homeTodosLoadingError={homeTodosLoadingError} 
        deleteHomeTodo={deleteHomeTodo}
        getHomeTodo={getHomeTodo}
        updateHomeTodo={updateHomeTodo}
      />
    </div>
  )
}

export default TodoHome;
