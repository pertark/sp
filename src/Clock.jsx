import logo from './logo.svg';
import styles from './App.module.css';
import { createEffect, createSignal, For, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";

// yep, clock
let sec;
let min;
let hour;
const [d, setDate] = createSignal(new Date());

const clock = setInterval(() => {
    setDate(new Date());
}, 1000)

function Clock(props) {

  // onCleanup(() => clearInterval(clock))
  
  return (
    <div {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        fill="white" 
        stroke='black' 
        style={{
          "stroke-linecap": "round",
          "height": "100%"
        }}
      >
        <circle cx="50" cy="50" r="48" strokeWidth="3" />
        <line x1="50" y1="50" 
          x2={50+45*Math.sin(d().getSeconds()/30*Math.PI)} // shift starting point from right to top
          y2={50-45*Math.cos(d().getSeconds()/30*Math.PI)} // flip to compensate for html coordinates
          ref={sec} 
          
          style={{
            "stroke-width": "1",
          }} />
        <line x1="50" y1="50" 
          x2={50+36*Math.sin((d().getMinutes()*6 + (d().getSeconds()/60*6))/180*Math.PI)} 
          y2={50-36*Math.cos((d().getMinutes()*6 + ((d().getSeconds()/60)*6))/180*Math.PI)} 
          ref={min} 
          style={{
            "stroke-width": "1.5",
          }} />
        <line x1="50" y1="50" 
          x2={50+20*Math.sin((d().getHours()/24*2*360 + ((d().getMinutes()/60)*30))/180*Math.PI)} 
          y2={50-20*Math.cos((d().getHours()/24*2*360 + ((d().getMinutes()/60)*30))/180*Math.PI)} 
          ref={hour} 
          style={{
            "stroke-width": "2",
          }} />
      </svg>
    </div>
  )
}

export default Clock;
