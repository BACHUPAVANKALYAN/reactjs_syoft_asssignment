import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Home from "./Home";
import Signup from "./Signup";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/" element={<Signup />} />
      <Route exact path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default App;
