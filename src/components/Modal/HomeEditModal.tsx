import Modal from 'react-modal';
import { HomeTodoInput } from '../../api_network/todos_api';
import { useForm } from 'react-hook-form';
import TextInput from "../TextInput/TextInput";
import { useEffect } from 'react';
import { HomeTodo } from '../../models/homeTodo';

Modal.setAppElement('#root');

interface HomeEditModalProps {
  isOpen: boolean;
  onConfirm: (input: HomeTodoInput)=> void;
  onCancel: ()=> void;
  todoHomeToEdit: HomeTodo | null;
}

const HomeEditModal = ({ isOpen, onCancel, onConfirm, todoHomeToEdit }: HomeEditModalProps) => {

  const { register, handleSubmit, reset } = useForm<HomeTodoInput>();

  useEffect(() => {
    if (todoHomeToEdit) {
      reset({
        homeName: todoHomeToEdit.homeName,
        homeTodo: {
          priority: todoHomeToEdit.homeTodo.priority || "",
          endDate: todoHomeToEdit.homeTodo.endDate || "",
          note: todoHomeToEdit.homeTodo.note || ""
        }
      });
    }
  }, [todoHomeToEdit, reset]);

  const onSubmit = async (data: HomeTodoInput) => {
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
            name="homeName"
            register={register}
            className='my-2 px-3 shadow-lg'
          />
          <TextInput
            name="homeTodo.priority"
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
            name="homeTodo.endDate"
            register={register}
            type='date'
            className='my-2 px-3 shadow-lg'
          />
          <TextInput
            name="homeTodo.note"
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

export default HomeEditModal;
