import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css"
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home"
import Protected from "./components/Protected";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Home" element={<Protected Component={Home} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
