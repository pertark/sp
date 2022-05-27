import { createEffect, createSignal, For, resetErrorBoundaries } from "solid-js";
import Flipping from "flipping/dist/flipping.css.js";


let flipping;
let options;
createEffect(() => flipping = new Flipping(options))

function Checklist(props) {
  const [tasks, setTasksRaw] = createSignal(JSON.parse(localStorage.tasks || "[\"\"]"), {equals: false})
  const [checked, setCheckedRaw] = createSignal(JSON.parse(localStorage.checked || "[]"), {equals: false})

  const setTasks = (...args) => {
    flipping.read();
    setTasksRaw(...args)
    flipping.flip();
  }

  const setChecked = (...args) => {
    flipping.read();
    setCheckedRaw(...args)
    flipping.flip();
  }

  createEffect(() => {
    localStorage.tasks = JSON.stringify(tasks());
  });

  createEffect(() => {
    localStorage.checked = JSON.stringify(checked());
  });

  const changeTask = (e) => {
    const id = parseInt(e.target.parentElement.attributes.key.value);
    const value = e.target.value;

    if (!value) {
      if (id == tasks().length - 1) return;
      setTasks((arr) => {
        arr.splice(id, 1);
        return arr;
      })
      return;
    }
    
    setTasks((arr) => { 
      arr.splice(id, 1, value); 
      return arr;
    })
    
    if (id == tasks().length - 1) { 
      setTasks((tasks) => tasks.concat(['']));
      e.target.value = "";
    }
  }

  const focusNext = (e) => {
    if (e.keyCode == 13) {
      const id = parseInt(e.target.parentElement.attributes.key.value);

      e.preventDefault()
      
      changeTask(e);

      let next = e.target.parentElement.nextSibling;
      if (!next) return;
      if (next.hasChildNodes() && !next.children[1].disabled) {
        next.children[1].focus()
      }
    }
    if (e.keyCode == 8 && !e.target.value) {
      e.preventDefault()
      let prev = e.target.parentElement.previousSibling;
      if (e.target.parentElement.attributes.key.value != tasks().length - 1) changeTask(e);
      if (prev.children.length == 2) {
        prev.children[1].focus()
      }
    }
  }
 
  // real coding moment
  const check = (e) => {
    const id = parseInt(e.target.parentElement.attributes.key.value);
    const value = e.target.parentElement.children[1].value;

    flipping.read()
    setTasksRaw((arr) => {
      arr.splice(id, 1);
      return arr;
    })

    setCheckedRaw((arr) => {
      arr.splice(0, 0, value);
      return arr;
    })
    flipping.flip()
  }

  const uncheck = (e) => {
    const id = parseInt(e.target.parentElement.attributes.key.value);
    const value = e.target.parentElement.children[1].value;

    flipping.read()
    setCheckedRaw((arr) => {
      arr.splice(id, 1);
      return arr;
    })

    setTasksRaw((arr) => {
      arr.splice(arr.length, 0, value);
      return arr;
    })
    flipping.flip()
  }

  return (
    <>
      <div 
        style={{
          "display": "flex",
          "flex-direction": "column",
          "width": "fit-content",
          "padding": "2em",
          ...props.style
        }} 
        data-flip-no-scale="boxbox"
      >
        <h1 style={{
          padding: 0,
          margin: 0,
          "text-align": "center",
        }}>
          Checklist
        </h1>
        <For each={tasks()}>
          {(task, i) => 
          <div 
            key={i()} 
            data-flip-key={`item-${task}`}
          >
            <input type="checkbox" onChange={check} />
            <input type="text" 
              value={task} 
              onKeyDown={focusNext} 
              ref={(e) => setTimeout(() => e.focus())}
            />
          </div>
          }
        </For>
        <For each={checked()}>
          {(task, i) => 
          <div 
            key={i()} 
            data-flip-key={`item-${task}`}
            class="item"
          >
            <input type="checkbox" onChange={uncheck} checked={true} />
            <input type="text" value={task} disabled={true} />
          </div>
          }
        </For>
      </div>
    </>
  );
}

export default Checklist;