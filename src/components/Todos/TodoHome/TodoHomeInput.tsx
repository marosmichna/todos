import TextInput from "../../TextInput/TextInput";
import { useForm } from "react-hook-form";
import * as TodosApi from "../../../api_network/todos_api";
import { HomeTodo } from "../../../models/homeTodo";
import { HomeTodoInput } from "../../../api_network/todos_api";

interface TodoHomeInputProps {
  addHomeTodo: (homeTodo: HomeTodo) => void;
}

const TodoHomeInput = ({ addHomeTodo }: TodoHomeInputProps) => {

  const { register, handleSubmit, reset } = useForm<HomeTodoInput>();

  const onSubmit = async (input: HomeTodoInput) => {
    const homeTodoInput: HomeTodoInput = {
      homeName: input.homeName,
      homeTodo: {
        priority: input.homeTodo?.priority || "",
        endDate: input.homeTodo?.endDate || "",
        note: input.homeTodo?.note || ""
      }
    };
    const response = await TodosApi.createHomeTodo(homeTodoInput);
    addHomeTodo(response);
    reset();
  }

  return (
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex"
    >
        <TextInput
            name="homeName"
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

export default TodoHomeInput;

