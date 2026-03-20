import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Tools from "./pages/Tools.jsx";
import Faq from "./pages/Faq.jsx";
import FoodNutrientExplorer from "./pages/food.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/foods" element={<FoodNutrientExplorer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
