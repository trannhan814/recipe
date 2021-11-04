import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Recipe } from "../constants/interfaceRecipe";
import { recipesItem } from "../constants/recipes";
import { DropdownButton, Dropdown } from "react-bootstrap";

interface Props {
  recipes: Recipe[];
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
}

const RecipeDetail = ({ recipes, setRecipes }: Props) => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipeDetail] = useState<Recipe | null>(null);
  const history = useHistory();

  const getRecipe = () => {
    const recipeFinded = recipes.find((recipe) => recipe.id === recipeId);
    if (recipeFinded) {
      setRecipeDetail(recipeFinded);
    }
  };

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  const deleteRecipe = () => {
    const recipeIndex = recipes.findIndex((item) => item.id === recipeId);
    recipesItem.splice(recipeIndex, 1);
    setRecipeDetail(null);
    setRecipes([...recipesItem]);
    history.push("/recipes");
  };

  return (
    <>
      {recipe && (
        <div>
          <img
            width="300px"
            className="img-thumbnail"
            src={recipe.imageUrl}
            alt=""
          />
          <h3>{recipe.name}</h3>
          <div className="mb-3">{recipe.description}</div>

          <div className="d-flex mb-3">
            <DropdownButton id="dropdown-basic-button" title="Manager Recipe">
              <Dropdown.Item
                onClick={() => {
                  history.push("/shopping-list");
                }}
              >
                To Shopping List
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  history.push(`/recipes/form-edit/${recipeId}`);
                }}
              >
                Edit Recipe
              </Dropdown.Item>
              <Dropdown.Item onClick={deleteRecipe}>
                Delete Recipe
              </Dropdown.Item>
            </DropdownButton>
          </div>

          {recipe.ingredients.map((ingredient) => (
            <div className="border bg-light p-2 m-1" style={{ width: "300px" }}>
              {ingredient.name} - {ingredient.quantity}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
