import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CreateRecipe from "./pages/create-recipe";
import SavedRecipes from "./pages/saved-recipes";
import Auth from "./pages/auth";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
      </Routes>
    </>
  );
}

export default App;
