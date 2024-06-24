import React from "react";
import "./myTasks.css";
import { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { FaRegPenToSquare } from "react-icons/fa6";

const ToDo = () => {
  const [mytodoList, setMytodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newInput, setNewInput] = useState("");
  const [search, setSearch] = useState("");

  //   const obj = {
  //     startdate: startdate,
  //     deadline: deadline,
  //     duration: duration,
  //   }

  //   setMytodoList([...mytodoList, obj])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("mytodoList"));
    if (storedTodos) {
      setMytodoList(storedTodos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("mytodoList", JSON.stringify(mytodoList));
  }, [mytodoList]);

  const handleAdd = () => {
    if (newTask.trim()) {
      setMytodoList([...mytodoList, newTask]);
      setNewTask("");
    }
  };

  const handleEdit = (index) => {
    setEditing(true);
    setEditingIndex(index);
    setNewInput(mytodoList[index]);
  };

  const handleSaveEdit = () => {
    const update = mytodoList.map(
      (todo, index) => (index === editingIndex ? newInput : todo) // new input value else it stays the same
    );
    setMytodoList(update);
    setEditing(false); // stop the editing mode
    setEditingIndex(null); // reset the task we're changing to none
    setNewInput(""); // reset the input field
  };

  console.log(mytodoList) 

  const handleDelete = (index) => {
    const deleteTask = mytodoList.filter((todo, i) => i !== index);
    console.log(index)
    setMytodoList(deleteTask);
  };

  // const CrossText = () 
  // {

  // }


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const Tasksearch = mytodoList.filter((todo) =>
    todo.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container">
      <h1 className="mytext">TO-DO List</h1>

      <div className="myAddbox">
        <textarea
          typeof="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a Task"
        />
        {/* <input 
        type="date"
        value={newTask} 
        onChange={(e)=>setNewTask(e.target.value)}
        placeholder='Date'/>
        <input 
        type="time"
        value={newTask} 
        onChange={(e)=>setNewTask(e.target.value)}
        placeholder='Time'/> */}

        <button onClick={handleAdd}>
          Add <IoIosAdd className="addbutton"/>
        </button>
        <div className="searchbox">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search Tasks "
        />
        <IoMdSearch/>
      </div>
      </div>

    <div className="everyContent">
    <div className="content">
      <div className="myInputs">
        <ul>
          {Tasksearch.map((todo, index) => (
            <li key={index} >
              <div className="mycheck">
              <input type="checkbox" className="checkbox"/>
              {editing && editingIndex === index ? (
                <textarea
                className="theText"
                  type="text"
                  value={newInput}
                  onChange={(e) => setNewInput(e.target.value)}
                />
              ) : (
                todo
              )}
               </div>
              <div className="editpart">
              {editing && editingIndex === index ? (
                <button className="save" onClick={handleSaveEdit}>Done</button>
              ) : (
                <>
                 <div className="buttons">
                   {/* {todo.startdate} - {todo.deadline} */}
                   <button className="pen" onClick={() => handleEdit(index)}>
                    <FaRegPenToSquare/>
                  </button>
                  <button className="trash" onClick={() => handleDelete(index)}>
                    <IoTrashOutline />
                  </button>
                 </div>
               </>
              )}
              </div>
            </li>
          ))}
        </ul>
      </div>
     </div>

      <div className="reminders">
        <h4>Reminders</h4>
        <textarea className="remind" placeholder="Reminders"/>
          {/* <h4>Reminders</h4> */}
        {/* </div> */}
        <h4>Notes</h4>
        <textarea className="notes" placeholder="Notes"/>
          {/* <h4>Notes</h4> */}
        {/* </div> */}
      </div>
    </div>
    </div>
  );
};

export default ToDo;
