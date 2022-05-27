import logo from './logo.svg';
import styles from './App.module.css';
import { createEffect, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import Checklist from './Checklist';
import Clock from './Clock';



function App() {
  return (
    <div>
      
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
          top: "10vh",
          "background-color": "rgb(255,255,255,0.4)"
        }}
      />
    </div>
  )
}

export default App;
