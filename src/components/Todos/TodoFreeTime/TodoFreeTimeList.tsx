import { useState } from "react";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { FreeTodoInput } from "../../../api_network/todos_api";
import {formatDate} from "../../../utils/formatDate";
import { FreeTodo } from "../../../models/freeTodo";
import FreeTimeEditModal from "../../Modal/FreeTimeEditModal";

interface TodoFreeTimeListProps {
    freeTodos: FreeTodo[];
    freeTodosLoadingError: boolean;
    deleteFreeTodo: (freeTodo: FreeTodo) => Promise<void>;
    getFreeTodo: (freeTodo: FreeTodo) => Promise<void>;
    updateFreeTodo: (freeTodo: FreeTodo, input: FreeTodoInput) => Promise<void>;
}

const TodoFreeTimeList = ({ freeTodos, freeTodosLoadingError, deleteFreeTodo, getFreeTodo, updateFreeTodo }: TodoFreeTimeListProps) => {

    const [showMoreStates, setShowMoreStates] = useState<{ [key: string]: boolean }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoFreeToEdit, setTodoFreeToEdit] = useState<FreeTodo | null>(null);
    const [isTodoDo, setIsTodoDo] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxClick = async (freeTodo: FreeTodo) => {
        await getFreeTodo(freeTodo);
        setIsTodoDo((prevState) => ({
          ...prevState,
          [freeTodo.id]: !prevState[freeTodo.id]
        }));
    };

    const toggleShowMore = async (freeTodo: FreeTodo) => {
        await getFreeTodo(freeTodo);
        setShowMoreStates((prevState) => ({
          ...prevState,
          [freeTodo.id]: !prevState[freeTodo.id]
        }));
    };

    const handleDeleteClick = async (freeTodo: FreeTodo) => {
        const confirmed = window.confirm("Are you sure you want to delete this job?");
        if (confirmed) {
          await deleteFreeTodo(freeTodo);
        }
    };

    const handleUpdateClick = async (freeTodo: FreeTodo) => {
        setTodoFreeToEdit(freeTodo);
        setIsModalOpen(true);
    }

    const handleConfirm = async (input: FreeTodoInput) => {
        if (todoFreeToEdit) {
            try {
                await updateFreeTodo(todoFreeToEdit.id, input);
                setIsModalOpen(false);
                setTodoFreeToEdit(null);
            } catch (error) {
                console.error(error);
                alert("Failed to update the job todo.");
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTodoFreeToEdit(null);
    }

  return (
    <div className="my-2">
        {
            freeTodosLoadingError && <p>Something went wrong. Please refresh the page</p>
        }
        {
            freeTodos.map((freeTodo) => (
                <div 
                    key={freeTodo.id}
                    className={`my-1 px-2 py-2 ${isTodoDo[freeTodo.id] ? 'bg-gray-500 dark:bg-blue-400' : 'bg-white'}`}
                    
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                        <input 
                            type="checkbox" 
                            onClick={() => handleCheckboxClick(freeTodo)}
                        />
                        <p className="text-lg font-sans ml-5">{freeTodo.freeName}</p>
                        </div>
                        <div className="flex items-center">
                            <div 
                                  className={`w-5 h-5 ${
                                    freeTodo.freeTodo.priority === "high" ? 'bg-red-600' :
                                    freeTodo.freeTodo.priority === "medium" ? 'bg-orange-500' :
                                    freeTodo.freeTodo.priority === "low" ? 'bg-green-400' :
                                    'bg-white'
                                  }`}
                            />
                            <button className="mx-1" onClick={() => handleUpdateClick(freeTodo)}><MdOutlineModeEdit size={20} /></button>
                            <button className="mx-1" onClick={() => handleDeleteClick(freeTodo)}><MdDeleteOutline size={20} /></button>
                            <button className="mx-1" onClick={() => toggleShowMore(freeTodo)}><SlOptions size={20} /></button>
                        </div>
                    </div>
                    {showMoreStates[freeTodo.id] && freeTodo.freeTodo && (
                        <div className="shadow-2xl my-2 py-2 px-3 bg-blue-100 rounded-md dark:bg-slate-200">
                            {freeTodo.freeTodo.priority && <p>Priority: {freeTodo.freeTodo.priority}</p>}
                            {freeTodo.freeTodo.endDate && <p>End date: {formatDate(freeTodo.freeTodo.endDate)}</p>}
                            {freeTodo.freeTodo.note && <p>Note: {freeTodo.freeTodo.note}</p>}
                        </div>
                        
                    )}
                </div>
            ))
        }
        <FreeTimeEditModal
            isOpen={isModalOpen}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            todoFreeToEdit={todoFreeToEdit}
        />
    </div>
  )
}

export default TodoFreeTimeList;
