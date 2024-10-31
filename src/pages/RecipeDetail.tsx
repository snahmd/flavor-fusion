import { useLocation } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { Recipe } from "../types/Recipe";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function RecipeDetail() {
  const { title } = useParams();
  console.log(title);
  const location = useLocation();
  console.log("-----------------");
  console.log(location);
  console.log("-----------------");

  if (location.state === null) {
    const [recipies, setRecipies] = useState<Recipe[] | []>([]);
    async function getPosts() {
      const data: any = await supabase
        .from("recipes")
        .select("*, ingredients(*), preparation(*)");

      const recipes_from_db: Recipe[] = data.data;
      setRecipies(recipes_from_db);
      console.log(recipes_from_db);
      return data;
    }
    getPosts();

    return (
      <div>
        <div>
          <h1>{recipies.title}</h1>
        </div>
      </div>
    );
  }

  const data = location.state.data;

  if (!data) {
    return <h1>Not found</h1>;
  }

  return (
    <div>
      <div>
        <h1>{data.name}</h1>
        <h2>{data.description}</h2>
      </div>
      <div>
        <h2>Ingredients:</h2>
        <ul>
          {data.ingredients.map((ingredient: any) => {
            return (
              <li key={ingredient.id}>
                {ingredient.name} {ingredient.quantity} {ingredient.unit}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h2>Preparation:</h2>
        <ol>
          {data.preparation.map((preparation: any) => {
            return <li key={preparation.id}>{preparation.text}</li>;
          })}
        </ol>
      </div>
      <div>
        <h3>Extra Info:</h3>
        <p>{data.extra_info}</p>
      </div>
    </div>
  );
}
