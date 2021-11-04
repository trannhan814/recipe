import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Route, useHistory, useLocation, useRouteMatch } from "react-router";
import { v4 } from "uuid";
import { recipesItem } from "../constants/recipes";
import RecipeFrom from "./Form";
import RecipeDetail from "./RecipeDetail";
import FormEdit from "./FormEdit";
import { Recipe } from "../constants/interfaceRecipe";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(recipesItem);
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  const [ButtonNew, setButtonNew] = useState<boolean>();

  const handleClickNewRecipe = () => {
    history.push(`${url}/form/${v4()}`);
  };

  useEffect(() => {
    if (location.pathname.includes("/recipes/form")) {
      setButtonNew(false);
    } else {
      setButtonNew(true);
    }
  }, [location]);

  return (
    <>
      <div className="row">
        <div className="col-6">
          <Button
            variant="success"
            onClick={handleClickNewRecipe}
            disabled={!ButtonNew}
            className="mt-3 ms-5"
          >
            New Recipe
          </Button>
        </div>

        <div className="col-6 mt-2">
          <Route path={`${url}`} exact={true}>
            <h4>Please select a Recipe!</h4>
          </Route>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          {recipesItem.map((recipe) => (
            <div
              key={recipe.id}
              className="info-recipe d-flex justify-content-between align-items-center"
              onClick={() => {
                history.push(`${url}/${recipe.id}`);
              }}
            >
              <div>
                <b>{recipe.name}</b>
                <p>{recipe.description}</p>
              </div>

              <img className="img" src={recipe.imageUrl} alt="" />
            </div>
          ))}
        </div>
        <div className="col-5">
          <Route path={`${url}/form/:recipeId`} exact={true}>
            <RecipeFrom />
          </Route>
          <Route path={`${url}/:recipeId`} exact={true}>
            <RecipeDetail recipes={recipes} setRecipes={setRecipes} />
          </Route>
          <Route path={`${url}/form-edit/:recipeId`} exact={true}>
            <FormEdit recipes={recipes} setRecipes={setRecipes} />
          </Route>
        </div>
      </div>
    </>
  );
};

export default Recipes;
