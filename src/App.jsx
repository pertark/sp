import logo from './logo.svg';
import styles from './App.module.css';
import { createEffect, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import Checklist from './Checklist';
import Clock from './Clock';
import Search from './Search';



function App() {
  return (
    <div>
      <meta name="description" content="Custom start page to remind you of the existence of time" />
      <Clock 
        style={{
          position: "absolute",
          top: "-15vh",
          right: "-10vh",
          opacity: "40%",
          height: "120vh"
        }}
      />
      <Checklist 
        style={{
          position: "absolute",
          left: "10%",
          top: "15vh",
          "background-color": "rgb(255,255,255,0.4)"
        }}
      />
      <Search style={{
        "z-index": 100,
        position: "absolute",
        top: "1em"
      }} />
    </div>
  )
}

export default App;
