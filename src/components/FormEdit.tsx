import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FormikProps,
  FormikHelpers,
  FieldArrayRenderProps,
} from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { Recipe } from "../constants/interfaceRecipe";
import { recipesItem } from "../constants/recipes";

interface Props {
  recipes: Recipe[];
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
}

const FormEdit = ({ recipes, setRecipes }: Props) => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipeEdit, setRecipeEdit] = useState<Recipe>();
  const history = useHistory();

  const getRecipe = () => {
    const findRecipes = recipes.find((recipe) => recipe.id === recipeId);
    if (findRecipes) {
      setRecipeEdit(findRecipes);
    }
  };

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  const validateForm = (values: Recipe) => {
    const error: any = {};

    if (!values.name) {
      error.name = "* Name require";
    }

    if (!values.imageUrl) {
      error.imageUrl = "* Image require";
    }

    if (!values.description) {
      error.description = "* Description require";
    }

    if (!values.ingredients.length) {
      error.ingredients = "* Ingredients require";
    } else {
      for (const ingredient of values.ingredients) {
        for (const key in ingredient) {
          if (!ingredient[key]) {
            error.ingredients = "* Ingredients require";
            break;
          }
        }
      }
    }

    if (Object.keys(error).length > 0) {
      return error;
    }
  };

  const onSubmit = (values: Recipe, FormikHelpers: FormikHelpers<Recipe>) => {
    const recipeIndex = recipesItem.findIndex(
      (recipe) => recipe.id === recipeId
    );

    recipesItem[recipeIndex] = values;
    setRecipes([...recipesItem]);
    FormikHelpers.resetForm();
    history.push("/recipes");
  };

  return (
    <>
      {recipeEdit && (
        <Formik
          initialValues={{
            id: recipeEdit.id,
            name: recipeEdit.name,
            imageUrl: recipeEdit.imageUrl,
            description: recipeEdit.description,
            ingredients: recipeEdit.ingredients,
          }}
          onSubmit={onSubmit}
          validate={validateForm}
        >
          {(formHelper: FormikProps<Recipe>) => (
            <Form>
              <div className="d-flex mb-3">
                <Button
                  className="me-3"
                  type="submit"
                  variant="success"
                  disabled={!formHelper.dirty || !formHelper.isValid}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    history.push("/recipes");
                  }}
                >
                  Cancel
                </Button>
              </div>

              <div className="d-flex flex-column">
                <label className="mb-3">
                  Name
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </label>

                <label className="mb-3">
                  Image URL
                  <Field type="text" name="imageUrl" className="form-control" />
                  {formHelper.values.imageUrl && (
                    <img
                      width="200px"
                      className="img-thumbnail"
                      src={formHelper.values.imageUrl}
                      alt=""
                    />
                  )}
                  <ErrorMessage
                    name="imageUrl"
                    component="div"
                    className="text-danger"
                  />
                </label>

                <label className="mb-3">
                  Description
                  <Field
                    as="textarea"
                    name="description"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />
                </label>
              </div>

              <FieldArray name="ingredients">
                {(arrayHelper: FieldArrayRenderProps) => (
                  <div>
                    {formHelper.values.ingredients.map((ingredient, index) => (
                      <div key={index} className="d-flex mb-3">
                        <Field
                          type="text"
                          name={`ingredients[${index}].name`}
                          className="form-control me-3"
                        />
                        <Field
                          type="number"
                          name={`ingredients[${index}].quantity`}
                          className="form-control me-3"
                        />
                        <Button
                          variant="danger"
                          onClick={() => {
                            arrayHelper.remove(index);
                          }}
                        >
                          x
                        </Button>
                      </div>
                    ))}
                    <ErrorMessage
                      name="ingredients"
                      component="div"
                      className="text-danger mb-4"
                    />

                    <div className="d-flex align-items-center">
                      <Button
                        className="me-3"
                        variant="success"
                        onClick={() => {
                          arrayHelper.push({ name: "", quantity: "" });
                        }}
                      >
                        Add Ingredient
                      </Button>
                      {!formHelper.values.ingredients.length && (
                        <div className="text-denger">
                          * Please add ingredients for recipe
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default FormEdit;
