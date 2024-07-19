import { useEffect, useState } from "react";
import TodoJobInput from "./TodoJobInput";
import TodoJobList from "./TodoJobList";
import { JobTodo } from "../../../models/jobTodo";
import { JobTodoInput } from "../../../api_network/todos_api";
import * as TodosApi from "../../../api_network/todos_api";

const TodoJob = () => {

  const [jobTodos, setJobTodos] = useState<JobTodo[]>([]);
  const [jobTodosLoadingError, setJobTodosLoadingError] = useState(false);

  // Get Job Todos
  useEffect(() => {
    async function loadJobTodos() {
        try {
            const jobTodos = await TodosApi.fetchJobTodos();
            setJobTodos(jobTodos);
        } catch (error) {
            console.error(error);
            setJobTodosLoadingError(true);
        }
    }
    loadJobTodos();
  }, []);

  // Add Job Todo
  const addJobTodo = (newJobTodo: JobTodo) => {
    setJobTodos([...jobTodos, newJobTodo]);
  };

  // Update Job Todo
  const updateJobTodo = async (id: string, input: JobTodoInput) => {
    try {
      const updatedJobTodo = await TodosApi.updateJobTodo(id, input);
      setJobTodos(jobTodos.map((jobTodo) => (jobTodo.id === id ? updatedJobTodo : jobTodo)));
      return updatedJobTodo;
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  // Delete Job Todo
  async function deleteJobTodo(jobTodo: JobTodo) {
    try {
      await TodosApi.deleteJobTodo(jobTodo.id);
      setJobTodos(jobTodos.filter(existingJobTodo => existingJobTodo.id !== jobTodo.id))
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // Get Job Todo (One Todo)
  async function getJobTodo(jobTodo: JobTodo) {
    try {
      await TodosApi.fetchJobTodo(jobTodo.id);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div>
      <TodoJobInput addJobTodo={addJobTodo} />
      <TodoJobList 
        jobTodos={jobTodos} 
        jobTodosLoadingError={jobTodosLoadingError} 
        deleteJobTodo={deleteJobTodo}
        getJobTodo={getJobTodo}
        updateJobTodo={updateJobTodo}
      />
    </div>
  )
}

export default TodoJob;
