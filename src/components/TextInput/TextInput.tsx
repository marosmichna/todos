
import { RegisterOptions, UseFormRegister } from "react-hook-form";

type InputTextProps = {
    className?: string;
    id?: string;
    name: string;
    type?: 'text' | 'date' | 'select';
    options?: { value: string; label: string }[];
    registerOptions?: RegisterOptions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
};

const InputText = ({ id, className = '', type = 'text', name, registerOptions, register, options }: InputTextProps) => {
    if (type === 'select' && options) {
        return (
            <select
                id={id}
                className={`block w-full border-gray-400 rounded outline-none px-2 py-2 ${className}`}
                {...register(name, registerOptions)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <input
            id={id}
            className={`block w-full border-gray-400 rounded outline-none px-2 py-2 ${className}`}
            type={type}
            {...register(name, registerOptions)}
        />
    );
};

export default InputText;
