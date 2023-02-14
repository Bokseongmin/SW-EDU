import React, { useEffect, useState } from "react";
import "./App.css";

function ItemRow({ item, removeItem, updateItem }) {
  const [mode, setMode] = useState(false);
  const [title, setTitle] = useState(item.title);
  return (
    <li>
      <p>
        <input
          checked={item.done ? "checked" : ""}
          type="checkbox"
          onChange={(e) => {
            item.done = e.target.checked;
            updateItem(item);
          }}
        />
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={item.done ? "done" : "not-done"}
          type="text"
          readOnly={mode ? "" : "readonly"}
          onClick={(e) => {
            setMode(true);
          }}
          onBlur={(e) => {
            item.title = title;
            updateItem(item);
            setMode(false);
          }}
        />
        <button
          onClick={(e) => {
            removeItem(item.no);
          }}
        >
          삭제
        </button>
        <button
          onClick={(e) => {
            setMode(!mode);
            if (mode) {
              item.title = title;
              updateItem(item);
            } else {
            }
          }}
        >
          {mode ? "수정완료" : "수정"}
        </button>
      </p>
    </li>
  );
}

function InputItem({ appendItem }) {
  // input의 value로 사용 할 경우 초기값 필수.
  const [newWork, setNewWork] = useState("");
  return (
    <div>
      할일 :
      <input
        type="text"
        value={newWork}
        onChange={(e) => {
          setNewWork(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            appendItem(newWork);
            setNewWork("");
          }
        }}
      />
      <button
        onClick={(e) => {
          appendItem(newWork);
          setNewWork("");
        }}
      >
        추가
      </button>
    </div>
  );
}

// Redux를 이용하면 해결된다.
function TodoList({ todoList, removeItem, updateItem }) {
  return (
    <div>
      <ol>
        {todoList.map((item, idx) => {
          return (
            <ItemRow
              key={item.no}
              item={item}
              removeItem={removeItem}
              updateItem={updateItem}
            />
          );
        })}
      </ol>
    </div>
  );
}

function App(props) {
  // 과제 1 : 취소선 기능 추가.
  // 과제 2 : todoList 데이터를 localStorage에 저장.
  // const [todoList, setTodoList] = useState([
  //   { no: 1, title: "점심 먹기", done: false },
  //   { no: 2, title: "산책 하기", done: false },
  //   { no: 3, title: "배운 것 복습하기", done: false },
  //   { no: 4, title: "내일 수업 예습하기", done: false },
  // ]);
  // const [noCount, setNoCount] = useState(5);
  const [todoList, setTodoList] = useState([]);
  const [noCount, setNoCount] = useState(1);

  useEffect(() => {
    // localStorage에 데이터가 있으면 로드한다.
    // 저장은 문자열로 한다.
    console.log(">>>>> useEffect ...");
    const localStorageData = localStorage.getItem("todoListData");
    if (localStorageData) {
      let objData = JSON.parse(localStorageData);
      setTodoList(objData.todoList);
      setNoCount(objData.noCount);
      console.log(">>>>> data load 완료");
      console.dir(objData);
    }
  }, []);

  function saveLocalStorage(newList, noCnt) {
    localStorage.setItem(
      "todoListData",
      JSON.stringify({ todoList: newList, noCount: noCnt }) // 저장은 문자열로 저장
    );
    console.log(">>>>> localStorage에 저장 완료");
  }

  function appendItem(newItem) {
    let newList = [...todoList, { no: noCount, title: newItem, done: false }];
    let noCnt = noCount + 1;
    setTodoList(newList);
    setNoCount(noCnt);
    saveLocalStorage(newList, noCnt);
  }
  function removeItem(no) {
    var newList = todoList.filter((item, idx) => {
      return item.no != no;
    });
    setTodoList(newList);
    saveLocalStorage(newList, noCount);
  }

  function updateItem(item) {
    //console.dir("updateItem: " + JSON.stringify(item)) ;
    // const idx = todoList.findIndex((todo, idx) => {
    //   return todo.no === item.no;
    // });
    // todoList[idx] = item;
    const newList = [...todoList];
    setTodoList(newList);
    saveLocalStorage(newList, noCount);
  }

  return (
    <>
      <h1>Todo List</h1>
      <InputItem appendItem={appendItem} />
      <hr />
      <TodoList
        todoList={todoList}
        removeItem={removeItem}
        updateItem={updateItem}
      />
    </>
  );
}

export default App;