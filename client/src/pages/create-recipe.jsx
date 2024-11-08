import { useState } from "react";
import axios from "axios";
import { usetGetUserId } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const userID = usetGetUserId();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imgaeUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (e, idx) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/recipes",
        recipe
      );
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="create">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit} action="">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} />

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            type="text"
            key={index}
            name="ingredients"
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, index)}
          />
        ))}
        <button type="button" onClick={addIngredients}>
          Add Ingredients
        </button>
        <label htmlFor="instruction">Instructions</label>

        <textarea
          type="text"
          onChange={handleChange}
          name="instruction"
          id="instruction"
          rows={5}
        />

        <label htmlFor="imageUrl">ImageUrl</label>
        <input
          type="text"
          onChange={handleChange}
          name="imageUrl"
          id="imageUrl"
        />
        <label htmlFor="cooking">Cooking Time(minutes)</label>
        <input
          type="number"
          onChange={handleChange}
          name="cooking"
          id="cooking"
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
export default CreateRecipe;
