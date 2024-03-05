import React, { useEffect, useState } from "react";
import "../App.css";
function Todo() {
  const [todo, setTodo] = useState("");
  const [allTodo, setAllTodo] = useState([]);
  const [toggleEdit, setToggleEdit ] = useState(true)
  const [isEdit, setIsEdit] = useState(null)

  //Function for add todo's
  const addTodo = () => {
    if (!todo){ return alert('Enter Your Todo')}
    else if (todo && !toggleEdit){
        setAllTodo(allTodo.map((ele, ind)=>{
            if(ind === isEdit){
                // allTodo.splice(ind)
                // let newTodo = ele.replace(ele, todo)
                // console.log(newTodo);
                console.log(ind);
                allTodo.slice(ind)
                console.log(allTodo);
                return todo
            }
            return ele;
        }))
        setTodo('')
        setToggleEdit(true)
        setIsEdit(null)
    }
    else{
        setAllTodo([...allTodo, todo]);
        setTodo("");
    }
 
  };
  // function for deleting single todo
  const deleteTodo = (index) => {
    let filterTodo = allTodo.filter((element, ind) => {
      return index !== ind;
    });
    setAllTodo(filterTodo);
  };

  // function for clear all todo
  const clearAllTodo = () => {
    setAllTodo([]);
  };

  //Function for edit todo
  const editTodo = (element, index)=>{
    console.log(element,index);
    setIsEdit(index)
    setToggleEdit(false)
    setTodo(element)
  }
  

  useEffect(() => {
    async function getData() {
      let jsonData = await fetch("https://dummyjson.com/todos?limit=3&skip=10");
      let result = await jsonData.json();
      let filterData = result.todos;

      let data = filterData.map((ele, index) => {
        return ele.todo;
      });
      if(!data) return
      setAllTodo([...allTodo, ...data]);
    }

    getData();
  }, []);

  return (
    <div className="flex justify-items-center align- items-center mt-28 ">
      <div className="lg:w-1/2 m-auto border-2 rounded-md ">
        <p className="text-white text-2xl font-bold text-center mt-8">
          Todo App
        </p>
        <div className="flex justify-center align-middle items-center mt-6 mb-6">
          <input
            className="p-2 rounded-tl-md rounded-bl-md border-none outline-none "
            type="text"
            placeholder="Add Todo..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <p
            className="bg-purple-950 font-extrabold  p-2  rounded-tr-md rounded-br-md cursor-pointer"
            onClick={() => addTodo()}
          >
            <i className="uil uil-plus text-white"></i>
          </p>
        </div>
        {allTodo.map((element, index) => {
          return (
            <div
              key={element}
              className="flex justify-center align-middle items-center mb-4"
            >
              <p className={`w-3/5 p-2 rounded-tl-md rounded-bl-md text-white text-left bg-purple-800 font-bold`}>
                {element}
              </p>
              <div className="flex">
                <p className="text-green-500 font-bold bg-purple-950 p-2 cursor-pointer" onClick={()=> editTodo(element, index)}>
                  <i className="uil uil-pen"></i>
                </p>
                <p
                  className="text-red-500 bg-purple-950 p-2 rounded-tr-md rounded-br-md cursor-pointer"
                  onClick={() => deleteTodo(index)}
                >
                  <i className="uil uil-trash"></i>
                </p>
              </div>
            </div>
          );
        })}
        <p
          className="text-white text-center font-bold p-2 bg-red-600 w-40 mb-8 mt-8 m-auto rounded-md "
          onClick={() => clearAllTodo()}
        >
          Clear ALL
        </p>
      </div>
    </div>
  );
}

export default Todo;
