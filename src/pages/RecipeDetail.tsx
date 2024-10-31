import { useLocation } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { Recipe } from "../types/Recipe";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { slugify } from "../utils/slugify";

export default function RecipeDetail() {
  const [recipie, setRecipie] = useState<Recipe | null>(null);
  const { title } = useParams();
  const location = useLocation();

  async function getPosts() {
    const data: any = await supabase
      .from("recipes")
      .select("*, ingredients(*), preparation(*)");
    const recipies = data.data;
    for (let i = 0; i < recipies.length; i++) {
      if (slugify(recipies[i].title) === title) {
        setRecipie(recipies[i]);
      }
    }
  }

  useEffect(() => {
    if (location.state === null) {
      getPosts();
    } else {
      setRecipie(location.state.data);
    }
  }, []);

  return (
    <div>
      <div>
        <h1>{recipie?.title}</h1>
        <h2>{recipie?.description}</h2>
      </div>
      <div>
        <h2>Ingredients:</h2>
        <ul>
          {recipie?.ingredients.map((ingredient: any) => {
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
          {recipie?.preparation.map((preparation: any) => {
            return <li key={preparation.id}>{preparation.text}</li>;
          })}
        </ol>
      </div>
      <div>
        <h3>Extra Info:</h3>
      </div>
    </div>
  );
}
