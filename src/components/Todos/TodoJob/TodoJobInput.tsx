import TextInput from "../../TextInput/TextInput";
import { useForm } from "react-hook-form";
import * as TodosApi from "../../../api_network/todos_api";
import { JobTodoInput } from "../../../api_network/todos_api";
import { JobTodo } from "../../../models/jobTodo";

interface TodoJobInputProps {
  addJobTodo: (jobTodo: JobTodo) => void;
}

const TodoJobInput = ({ addJobTodo }: TodoJobInputProps) => {

  const { register, handleSubmit, reset } = useForm<JobTodoInput>();

  const onSubmit = async (input: JobTodoInput) => {
    const jobTodoInput: JobTodoInput = {
      jobName: input.jobName,
      jobTodo: {
        priority: input.jobTodo?.priority || "",
        endDate: input.jobTodo?.endDate || "",
        note: input.jobTodo?.note || ""
      }
    };
    const response = await TodosApi.createJobTodo(jobTodoInput);
    addJobTodo(response);
    reset();
  }

  return (
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex"
    >
        <TextInput
            name="jobName"
            register={register}  
        />
        <button 
            className="border p-4 ml-2 bg-blue-400 text-white dark:bg-slate-400" 
            type="submit"
        >
            +
        </button>
    </form>

  )
}

export default TodoJobInput;

