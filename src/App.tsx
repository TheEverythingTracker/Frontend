import React from 'react';
import {BottomToolbar} from "./BottomToolbar";
import {RightToolbar} from "./RightToolbar";

function App() {
  return (
    <div className="App">


        <p>Test Video</p>
        <video id="video" controls autoPlay height="800">
            <source type="video/mp4"/>
        </video>

        <RightToolbar></RightToolbar>

        <BottomToolbar></BottomToolbar>
    </div>
  );
}

export default App;
