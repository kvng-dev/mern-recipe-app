import { useEffect, useState } from "react";
import axios from "axios";
import { usetGetUserId } from "../hooks/useGetUserID";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
    fetchSavedRecipes();
  }, []);

  const userID = usetGetUserId();

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/recipes/${id}`
        );
        alert(response.data.message);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  const isRecipeSaved = (id) => savedRecipes?.includes(id);

  return (
    <div className="recipe">
      <h1>All Recipes</h1>
      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h2>{recipe.name}</h2>

              <button
                className={`btn save`}
                disabled={isRecipeSaved(recipe._id)}
                onClick={() => saveRecipe(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div>
              <h4>ingredients</h4>
              {recipe.ingredients.map((i) => (
                <p>-{i}</p>
              ))}
            </div>
            <div>
              <h4>instructions</h4>
              <p>{recipe.instruction}</p>
            </div>
            <img src={recipe.imageUrl} style={{ width: "100%" }} alt="" />
            <p>Cooking Time: {recipe.cooking} (minutes)</p>
            <button
              className="btn del"
              onClick={() => handleDelete(recipe._id)}
            >
              Delete Recipe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;
