import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";

type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  preparation: Preparation[];
};

type Ingredient = {
  id: string;
  name: string;
  unit: string;
  qauntity: string;
};

type Preparation = {
  id: string;
  text: string;
  index: number;
};

export default function Home() {
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
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="flex gap-8 flex-wrap">
        {recipies.map((hallo: Recipe) => {
          return (
            <div key={hallo.id} className="border">
              <h1>{hallo.title}</h1>
              <h2>{hallo.description}</h2>
              <Link
                to={`recipe/${slugify(hallo.title)}`}
                state={{ data: hallo }}
                className="border p-2"
              >
                Read More
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
