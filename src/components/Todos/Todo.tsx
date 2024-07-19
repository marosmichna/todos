import { useState } from "react";
import TodoFreeTime from "./TodoFreeTime/TodoFreeTime";
import TodoHome from "./TodoHome/TodoHome";
import TodoJob from "./TodoJob/TodoJob";

const style = {
  li: `bg-slate-300 py-1 px-2 rounded-md cursor-pointer dark:bg-slate-100`,
  activeLi: `bg-blue-400 py-1 px-2 rounded-md cursor-pointer text-white dark:bg-slate-400`
}

const Todo = () => {

  const [tabToggle, setTabToggle] = useState(1);

  const updateTabToggle = (id: number) => {
    setTabToggle(id);
  }

  return (
    <div>
      <ul className="flex items-center justify-between">
        <li className={tabToggle === 1 ? style.activeLi : style.li} onClick={() => updateTabToggle(1)}>Job Todo</li>
        <li className={tabToggle === 2 ? style.activeLi : style.li} onClick={() => updateTabToggle(2)}>Home Todo</li>
        <li className={tabToggle === 3 ? style.activeLi : style.li} onClick={() => updateTabToggle(3)}>Free Time Todo</li>
      </ul>
      <div className="my-2 border-b-2 border-slate-100"></div>
      <div className={tabToggle === 1 ? "" : "hidden"}>
        <TodoJob />
      </div>
      <div className={tabToggle === 2 ? "" : "hidden"}>
        <TodoHome />
      </div>
      <div className={tabToggle === 3 ? "" : "hidden"}>
        <TodoFreeTime />
      </div>
    </div>
  )
}

export default Todo;
