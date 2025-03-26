// import React from "react";
// import FormBuilder from "./components/FormBuilder";
// import ScreenRouter from "./config/Routes";

// const App = () => {
//   return (
//     <div className="p-4 bg-gray-50 min-h-screen">
//     {/* Header Section */}
//     {/* <FormBuilder /> */}
//     <main className="text-center mt-20 px-10">
//         <ScreenRouter />
//       </main>
//   </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter } from "react-router-dom";
import ScreenRouter from "./config/Routes";

const App = () => {
  return (
    <BrowserRouter> {/* Wrap everything inside BrowserRouter */}
      <div className="p-4 bg-gray-50 min-h-screen">
        {/* Header Section */}
        {/* <FormBuilder /> */}
        <main className="text-center mt-20 px-10">
          <ScreenRouter />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
