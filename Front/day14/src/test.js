import React, { useState } from "react";
import "./App.css";

function ItemRow({ item, removeItem, handleChange }) {
  const textDecoration = { textDecoration: item.done ? 'line-through' : 'none' };
  return (
    <li>
      <p style={textDecoration}>
        <input type="checkbox" checked={item.done} onChange={(e) => handleChange(e, item)} />
        <input type="text" value={item.title} disabled style={textDecoration} />
        <button onClick={(e) => {
          removeItem(item.no);
        }}>삭제</button>
      </p>
    </li>
  );
}

function InputItem({ appendItem }) {
  const [newWork, setNewWork] = useState();
  return (
    <div>
      할일 :
      <input
        type="text"
        value={newWork}
        onChange={(e) => {
          setNewWork(e.target.value);
          console.log(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          appendItem(newWork);
        }}
      >
        추가
      </button>
    </div>
  );
}

function TodoList({ todoList, removeItem, handleChange }) {
  return (
    <div>
      <ul>
        {todoList.map((item, idx) => {
          return (
            <ItemRow
              key={item.no}
              item={item}
              removeItem={removeItem}
              handleChange={handleChange}
            />
          );
        })}
      </ul>
    </div>
  );
}

function App(props) {
  const [todoList, setTodoList] = useState([
    { no: 1, title: "점심", done: false },
    { no: 2, title: "산책", done: false },
    { no: 3, title: "복습", done: false },
    { no: 4, title: "예습", done: false },
  ]);
  const [noCount, setNoCount] = useState(5);

  function appendItem(newItem) {
    setTodoList([
      ...todoList,
      { no: noCount, title: newItem, done: false },
    ]);
    setNoCount(noCount + 1);
  }

  function removeItem(no) {
    var newList = todoList.filter((item, idx) => {
      return item.no != no;
    });
    setTodoList(newList);
  }

  function handleChange(e, item) {
    const newTodoList = todoList.map((todo) => {
      if (todo.no === item.no) {
        return {
          ...todo,
          done: e.target.checked,
        };
      }
      return todo;
    });
    setTodoList(newTodoList);
  }

  return (
    <>
      <h1>Todo List</h1>
      <InputItem appendItem={appendItem} />
      <hr />
      <TodoList todoList={todoList} removeItem={removeItem} handleChange={handleChange} />
    </>
  );
}

export default App;
