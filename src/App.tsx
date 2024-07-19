import { useState } from "react";
import Todo from "./components/Todos/Todo";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
    <div className="h-screen w-screen p-4 bg-blue-200 dark:bg-neutral-800">
      <div className="bg-gray-200 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 dark:bg-gray-600">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="flex mx-auto mb-4 p-2 bg-gray-300 rounded"
        >
          {darkMode ? <MdOutlineLightMode /> : <MdLightMode />}
        </button>
        <Todo />
      </div>
    </div>
  </div>
  )
}

export default App;
