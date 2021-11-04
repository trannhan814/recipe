import { Ingredient } from "../constants/interfaceRecipe";
import { recipesItem } from "../constants/recipes";

const ShoppingList = () => {
  const getIngredients = () => {
    let totalIngredients = [];

    for (const recipe of recipesItem) {
      for (const item of recipe.ingredients) {
        totalIngredients.push(item);
      }
    }

    const result: Ingredient[] = [];

    totalIngredients.reduce((res: any, value) => {
      if (!res[value.name]) {
        res[value.name] = { name: value.name, quantity: 0 };
        result.push(res[value.name]);
      }
      res[value.name].quantity += value.quantity;
      return res;
    }, {});

    return result;
  };

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Count</th>
            </tr>
          </thead>

          <tbody>
            {getIngredients().map((ingredient: Ingredient) => (
              <tr>
                <td> {ingredient.name} </td>
                <td> {ingredient.quantity} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShoppingList;
