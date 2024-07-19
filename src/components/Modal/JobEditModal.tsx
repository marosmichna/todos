import Modal from 'react-modal';
import { JobTodo } from '../../models/jobTodo';
import { JobTodoInput } from '../../api_network/todos_api';
import { useForm } from 'react-hook-form';
import TextInput from "../TextInput/TextInput";
import { useEffect } from 'react';

Modal.setAppElement('#root');

interface JobEditModalProps {
  isOpen: boolean;
  onConfirm: (input: JobTodoInput)=> void;
  onCancel: ()=> void;
  todoJobToEdit: JobTodo | null;
}

const JobEditModal = ({ isOpen, onCancel, onConfirm, todoJobToEdit }: JobEditModalProps) => {

  const { register, handleSubmit, reset } = useForm<JobTodoInput>();

  useEffect(() => {
    if (todoJobToEdit) {
      reset({
        jobName: todoJobToEdit.jobName,
        jobTodo: {
          priority: todoJobToEdit.jobTodo.priority || "",
          endDate: todoJobToEdit.jobTodo.endDate || "",
          note: todoJobToEdit.jobTodo.note || ""
        }
      });
    }
  }, [todoJobToEdit, reset]);

  const onSubmit = async (data: JobTodoInput) => {
    await onConfirm(data);
    reset(); 
};

  return (
    <div>
      <Modal
        isOpen={isOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <TextInput
            name="jobName"
            register={register}
            className='my-2 px-3 shadow-lg'
          />
          <TextInput
            name="jobTodo.priority"
            register={register}
            type="select"
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' }
            ]}
            className='my-2 px-3 shadow-lg'
          />
          <TextInput
            name="jobTodo.endDate"
            register={register}
            type='date'
            className='my-2 px-3 shadow-lg'
          />
          <TextInput
            name="jobTodo.note"
            register={register}
            className='my-2 px-3 shadow-lg'
          />
          <button
            className="border p-2 bg-blue-400 text-white dark:bg-slate-400"
            type="submit"
          >
            Save
          </button>
          <button
            className="border p-2 mt-2 bg-gray-300 text-black dark:bg-slate-600"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default JobEditModal;
