import { useState } from "react";
import { JobTodo } from "../../../models/jobTodo";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import JobEditModal from "../../Modal/JobEditModal";
import { JobTodoInput } from "../../../api_network/todos_api";
import {formatDate} from "../../../utils/formatDate";

interface TodoJobListProps {
    jobTodos: JobTodo[];
    jobTodosLoadingError: boolean;
    deleteJobTodo: (jobTodo: JobTodo) => Promise<void>;
    getJobTodo: (jobTodo: JobTodo) => Promise<void>;
    updateJobTodo: (jobTodo: JobTodo, input: JobTodoInput) => Promise<void>;
}

const TodoJobList = ({ jobTodos, jobTodosLoadingError, deleteJobTodo, getJobTodo, updateJobTodo }: TodoJobListProps) => {

    const [showMoreStates, setShowMoreStates] = useState<{ [key: string]: boolean }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoJobToEdit, setTodoJobToEdit] = useState<JobTodo | null>(null);
    const [isTodoDo, setIsTodoDo] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxClick = async (jobTodo: JobTodo) => {
        await getJobTodo(jobTodo);
        setIsTodoDo((prevState) => ({
          ...prevState,
          [jobTodo.id]: !prevState[jobTodo.id]
        }));
    };

    const toggleShowMore = async (jobTodo: JobTodo) => {
        await getJobTodo(jobTodo);
        setShowMoreStates((prevState) => ({
          ...prevState,
          [jobTodo.id]: !prevState[jobTodo.id]
        }));
    };

    const handleDeleteClick = async (jobTodo: JobTodo) => {
        const confirmed = window.confirm("Are you sure you want to delete this job?");
        if (confirmed) {
          await deleteJobTodo(jobTodo);
        }
    };

    const handleUpdateClick = async (jobTodo: JobTodo) => {
        setTodoJobToEdit(jobTodo);
        setIsModalOpen(true);
    }

    const handleConfirm = async (input: JobTodoInput) => {
        if (todoJobToEdit) {
            try {
                await updateJobTodo(todoJobToEdit.id, input);
                setIsModalOpen(false);
                setTodoJobToEdit(null);
            } catch (error) {
                console.error(error);
                alert("Failed to update the job todo.");
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTodoJobToEdit(null);
    }

  return (
    <div className="my-2">
        {
            jobTodosLoadingError && <p>Something went wrong. Please refresh the page</p>
        }
        {
            jobTodos.map((jobTodo) => (
                <div 
                    key={jobTodo.id}
                    className={`my-1 px-2 py-2 ${isTodoDo[jobTodo.id] ? 'bg-gray-500 dark:bg-blue-400' : 'bg-white'}`}
                    
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                        <input 
                            type="checkbox" 
                            onClick={() => handleCheckboxClick(jobTodo)}
                        />
                        <p className="text-lg font-sans ml-5">{jobTodo.jobName}</p>
                        </div>
                        <div className="flex items-center">
                            <div 
                                  className={`w-5 h-5 ${
                                    jobTodo.jobTodo.priority === "high" ? 'bg-red-600' :
                                    jobTodo.jobTodo.priority === "medium" ? 'bg-orange-500' :
                                    jobTodo.jobTodo.priority === "low" ? 'bg-green-400' :
                                    'bg-white'
                                  }`}
                            />
                            <button className="mx-1" onClick={() => handleUpdateClick(jobTodo)}><MdOutlineModeEdit size={20} /></button>
                            <button className="mx-1" onClick={() => handleDeleteClick(jobTodo)}><MdDeleteOutline size={20} /></button>
                            <button className="mx-1" onClick={() => toggleShowMore(jobTodo)}><SlOptions size={20} /></button>
                        </div>
                    </div>
                    {showMoreStates[jobTodo.id] && jobTodo.jobTodo && (
                        <div className="shadow-2xl my-2 py-2 px-3 bg-blue-100 rounded-md dark:bg-slate-200">
                            {jobTodo.jobTodo.priority && <p>Priority: {jobTodo.jobTodo.priority}</p>}
                            {jobTodo.jobTodo.endDate && <p>End date: {formatDate(jobTodo.jobTodo.endDate)}</p>}
                            {jobTodo.jobTodo.note && <p>Note: {jobTodo.jobTodo.note}</p>}
                        </div>
                        
                    )}
                </div>
            ))
        }
        <JobEditModal 
            isOpen={isModalOpen}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            todoJobToEdit={todoJobToEdit}
        />
    </div>
  )
}

export default TodoJobList;
