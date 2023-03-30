import React from 'react';
import {Toolbar} from "./Toolbar";

function App() {
    const test = 'testvideo.mp4'
  return (
    <div className="App">

        <p>Test Video</p>
        <video controls autoPlay height={"1000"} width={"800"}>
            <source src={test} type="video/mp4"/>
        </video>

        <Toolbar></Toolbar>
    </div>
  );
}

export default App;
