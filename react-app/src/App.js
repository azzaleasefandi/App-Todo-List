/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { TodoServices } from './services/to-do-service'

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task._id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        TodoServices.taskCheckBox(task._id,task.name,task.completed)
        task.completed = !task.completed
        return {...task, completed: task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  function deleteTask(id) {
    TodoServices.deleteTask(id)
    const remainingTasks = tasks.filter(task => id !== task._id);
    setTasks(remainingTasks);
  }


  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task._id) {
        TodoServices.editTask(task._id,newName,task.completed)
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task._id}
      name={task.name}
      completed={task.completed}
      key={task._id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  async function onClickAddNewTask(name) { 
    let newTask = await TodoServices.addNewTask(name);
    setTasks([...tasks,newTask]);
    console.log(newTask)
  }


  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} in total`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <Form addTask={onClickAddNewTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
