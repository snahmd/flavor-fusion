import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";
import Hero from "../components/Hero";

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
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Hero />
        <section className="container py-12 md:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Die beliebtesten Rezepte
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipies.map((recipe) => (
              <div
                key={recipe.id}
                className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt={recipe.title}
                  className="aspect-[4/3] object-cover w-full"
                />
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold">{recipe.title}</h3>
                  <p className="mb-4 text-muted-foreground">
                    {recipe.description}
                  </p>
                  <a
                    href={`/rezept/${recipe.id}`}
                    className="inline-flex items-center justify-center rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Zum Rezept
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
