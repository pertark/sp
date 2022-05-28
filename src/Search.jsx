import { createEffect } from "solid-js";

let searchbar;

const search = (e) => {
  if (e.keyCode == 13) {
    // check for valid url or ip
    // doing it cheap
    let address = searchbar.value;
    if (!searchbar.value.includes("http")) {
      address = "https://www.google.com/search?q=" + encodeURIComponent(address);
    }

    document.location.replace(address)
  }
}

function Search(props) {

  createEffect(() => {
    setTimeout(() => searchbar.focus())
  })

  return (
    <div style={{
      width: "100%",
      display: "flex",
      "justify-content": "center",
      ...props.style
    }} >
      <input type="text" 
        style={{
          width: "80%",
          "font-size": "24px",
        }}
        onKeyDown={search} 
        ref={searchbar}
        spellcheck="false"
      /> 
    </div>
  )
}

export default Search