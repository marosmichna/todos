import TextInput from "../../TextInput/TextInput";
import { useForm } from "react-hook-form";
import * as TodosApi from "../../../api_network/todos_api";
import { HomeTodo } from "../../../models/homeTodo";
import { FreeTodoInput } from "../../../api_network/todos_api";
import { FreeTodo } from "../../../models/freeTodo";

interface TodoFreeTimeInputProps {
  addFreeTodo: (freeTodo: FreeTodo) => void;
}

const TodoFreeTimeInput = ({ addFreeTodo }: TodoFreeTimeInputProps) => {

  const { register, handleSubmit, reset } = useForm<FreeTodoInput>();

  const onSubmit = async (input: FreeTodoInput) => {
    const freeTodoInput: FreeTodoInput = {
      freeName: input.freeName,
      freeTodo: {
        priority: input.freeTodo?.priority || "",
        endDate: input.freeTodo?.endDate || "",
        note: input.freeTodo?.note || ""
      }
    };
    const response = await TodosApi.createFreeTodo(freeTodoInput);
    addFreeTodo(response);
    reset();
  }

  return (
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex"
    >
        <TextInput
            name="freeName"
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

export default TodoFreeTimeInput;

