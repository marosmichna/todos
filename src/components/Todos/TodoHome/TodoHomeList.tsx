import { useState } from "react";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { HomeTodoInput } from "../../../api_network/todos_api";
import {formatDate} from "../../../utils/formatDate";
import { HomeTodo } from "../../../models/homeTodo";
import HomeEditModal from "../../Modal/HomeEditModal";

interface TodoHomeListProps {
    homeTodos: HomeTodo[];
    homeTodosLoadingError: boolean;
    deleteHomeTodo: (homeTodo: HomeTodo) => Promise<void>;
    getHomeTodo: (homeTodo: HomeTodo) => Promise<void>;
    updateHomeTodo: (homeTodo: HomeTodo, input: HomeTodoInput) => Promise<void>;
}

const TodoHomeList = ({ homeTodos, homeTodosLoadingError, deleteHomeTodo, getHomeTodo, updateHomeTodo }: TodoHomeListProps) => {

    const [showMoreStates, setShowMoreStates] = useState<{ [key: string]: boolean }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoHomeToEdit, setTodoHomeToEdit] = useState<HomeTodo | null>(null);
    const [isTodoDo, setIsTodoDo] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxClick = async (homeTodo: HomeTodo) => {
        await getHomeTodo(homeTodo);
        setIsTodoDo((prevState) => ({
          ...prevState,
          [homeTodo.id]: !prevState[homeTodo.id]
        }));
    };

    const toggleShowMore = async (homeTodo: HomeTodo) => {
        await getHomeTodo(homeTodo);
        setShowMoreStates((prevState) => ({
          ...prevState,
          [homeTodo.id]: !prevState[homeTodo.id]
        }));
    };

    const handleDeleteClick = async (homeTodo: HomeTodo) => {
        const confirmed = window.confirm("Are you sure you want to delete this job?");
        if (confirmed) {
          await deleteHomeTodo(homeTodo);
        }
    };

    const handleUpdateClick = async (homeTodo: HomeTodo) => {
        setTodoHomeToEdit(homeTodo);
        setIsModalOpen(true);
    }

    const handleConfirm = async (input: HomeTodoInput) => {
        if (todoHomeToEdit) {
            try {
                await updateHomeTodo(todoHomeToEdit.id, input);
                setIsModalOpen(false);
                setTodoHomeToEdit(null);
            } catch (error) {
                console.error(error);
                alert("Failed to update the job todo.");
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTodoHomeToEdit(null);
    }

  return (
    <div className="my-2">
        {
            homeTodosLoadingError && <p>Something went wrong. Please refresh the page</p>
        }
        {
            homeTodos.map((homeTodo) => (
                <div 
                    key={homeTodo.id}
                    className={`my-1 px-2 py-2 ${isTodoDo[homeTodo.id] ? 'bg-gray-500 dark:bg-blue-400' : 'bg-white'}`}
                    
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                        <input 
                            type="checkbox" 
                            onClick={() => handleCheckboxClick(homeTodo)}
                        />
                        <p className="text-lg font-sans ml-5">{homeTodo.homeName}</p>
                        </div>
                        <div className="flex items-center">
                            <div 
                                  className={`w-5 h-5 ${
                                    homeTodo.homeTodo.priority === "high" ? 'bg-red-600' :
                                    homeTodo.homeTodo.priority === "medium" ? 'bg-orange-500' :
                                    homeTodo.homeTodo.priority === "low" ? 'bg-green-400' :
                                    'bg-white'
                                  }`}
                            />
                            <button className="mx-1" onClick={() => handleUpdateClick(homeTodo)}><MdOutlineModeEdit size={20} /></button>
                            <button className="mx-1" onClick={() => handleDeleteClick(homeTodo)}><MdDeleteOutline size={20} /></button>
                            <button className="mx-1" onClick={() => toggleShowMore(homeTodo)}><SlOptions size={20} /></button>
                        </div>
                    </div>
                    {showMoreStates[homeTodo.id] && homeTodo.homeTodo && (
                        <div className="shadow-2xl my-2 py-2 px-3 bg-blue-100 rounded-md dark:bg-slate-200">
                            {homeTodo.homeTodo.priority && <p>Priority: {homeTodo.homeTodo.priority}</p>}
                            {homeTodo.homeTodo.endDate && <p>End date: {formatDate(homeTodo.homeTodo.endDate)}</p>}
                            {homeTodo.homeTodo.note && <p>Note: {homeTodo.homeTodo.note}</p>}
                        </div>
                        
                    )}
                </div>
            ))
        }
        <HomeEditModal 
            isOpen={isModalOpen}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            todoHomeToEdit={todoHomeToEdit}
        />
    </div>
  )
}

export default TodoHomeList;
