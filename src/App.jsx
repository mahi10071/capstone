

import React from "react";
import { BrowserRouter } from "react-router-dom";
import ScreenRouter from "./config/Routes";

const App = () => {
  return (
    <BrowserRouter> 
      <div >
       
        <main >
          <ScreenRouter />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
