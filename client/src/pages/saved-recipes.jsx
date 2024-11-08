import { useEffect, useState } from "react";
import axios from "axios";
import { usetGetUserId } from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = usetGetUserId();

  useEffect(() => {
    const recipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    recipes();
  }, [userID]);

  console.log(savedRecipes);
  return (
    <div className="recipe">
      <h1>Saved Recipes</h1>
      <ul className="recipe-list">
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h2>{recipe.name}</h2>
            </div>
            <div>
              <p>{recipe.instruction}</p>
            </div>
            <img src={recipe.imageUrl} style={{ width: "100%" }} alt="" />
            <p>Cooking Time: {recipe.cooking} (minutes)</p>
            <button onClick={() => handleDelete(recipe._id)}>
              Delete Recipe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SavedRecipes;
