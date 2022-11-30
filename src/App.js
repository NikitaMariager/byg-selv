import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/nav";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import "./App.scss";

function App() {
  return (
    <Router>
      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
