import React, { useState } from "react";

const TodoList = ({ ...props}) => {
  const [list, setList] = useState([])
  const [inputValue, setInputValue] = useState('');

  const changeValue = (e) => {
    const value = e.target.value;
    setInputValue(value)
  }

  const addList = () => {
    if (inputValue) {
      let newList = [
        ...list,
        inputValue
      ];

      setList(newList)
      setInputValue('')
    }
  }

  const removeList = (index) => {
    const newList = [...list]
    newList.splice(index, 1);
    setList(newList)
  }

  return (
    <>
      <ul>
        {list.map((l, i) => (
          <li key={`list-${i}`}>{l} <button onClick={() => removeList(i)}>Excluir</button></li>
        ))}
      </ul>
      <input placeholder="Digite um todo" value={inputValue} onChange={(e) => changeValue(e)}/>
      <button onClick={() => addList()}>Adicionar</button>
    </>
  )
}

export default TodoList