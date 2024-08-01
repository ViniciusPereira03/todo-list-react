import axios from 'axios';
import React, { useEffect, useState } from "react";

const TodoList = ({ ...props}) => {
  const [list, setList] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [percent, setPercent] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalFinish, setTotalFinish] = useState(0)

  const changeValue = (e) => {
    const value = e.target.value;
    setInputValue(value)
  }

  const addList = () => {
    if (inputValue) {
      let newList = [
        ...list,
        {
          todo: inputValue,
          id: 0,
          completed: false
        }
      ];

      setList(newList)
      setInputValue('')

      setTotal(total+1)

      setTimeout(() => {
        var objDiv = document.getElementById("lista");
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 100);
    }
  }

  const removeList = (index) => {
    
    const newList = [...list]

    if (newList[index].completed === true) {
      setTotalFinish(totalFinish-1)
    }

    newList.splice(index, 1);
    setList(newList)
    setTotal(total-1)
  }

  const getList = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/todos');

      let finish = 0;
      const todos = response.data.todos;

      if (todos) {
        todos.map((todo) => {
          if (todo.completed === true) {
            finish++
          }
        })
  
        setList(todos)
  
        setTotal(todos.length)
        setTotalFinish(finish);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const finishItem = (index) => {
    const newList = [...list];
    newList[index].completed = true;
    setList(newList);
    setTotalFinish(totalFinish+1)
  }

  const calculaPercent = () => {
    const percent = (totalFinish*100)/total
    setPercent(percent)
  }

  useEffect(() => {
    getList()
  }, [])


  useEffect(() => {
    if (total > 0 || totalFinish > 0) {
      calculaPercent()
    }
  }, [total, totalFinish])

  return (
    <>

      <div id="bar" class="progress">
        <div class="progress-bar" role="progressbar" style={{width: `${percent}%`}} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">{percent.toFixed(1)}%</div>
      </div>

      <div id="lista">
        <ul>
          {list.map((l, i) => (
            <li key={`list-${i}`} className={l.completed ? 'completed' : ''}>
              {l.todo}
              
              <div className="buttons">
                {!l.completed && (<button className="btn btn-success btn-sm" onClick={() => finishItem(i)}>Finalizar</button>)}
                <button className="btn btn-danger btn-sm" onClick={() => removeList(i)}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
      
      <div className="linha">
        <input className="form-control" placeholder="Digite um todo" value={inputValue} onChange={(e) => changeValue(e)}/>
        <button className="btn btn-dark" onClick={() => addList()}>Adicionar</button>
      </div>
    </>
  )
}

export default TodoList