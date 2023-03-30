import React from 'react';
import {BottomToolbar} from "./BottomToolbar";
import {RightToolbar} from "./RightToolbar";

function App() {
    const test = 'testvideo.mp4'
  return (
    <div className="App">

        <p>Test Video</p>
        <video controls autoPlay height="800">
            <source src={test} type="video/mp4"/>
        </video>

        <RightToolbar></RightToolbar>

        <BottomToolbar></BottomToolbar>
    </div>
  );
}

export default App;
