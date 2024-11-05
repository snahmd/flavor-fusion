import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/utils/supabaseClient";
import { CloudinaryUploadWidget } from "../components/CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";

type Ingredient = {
  id: string;
  name: string;
  unit: string;
  quantity: string;
};

type Preparation = {
  id: string;
  text: string;
  index: number;
};

type Recipe = {
  title: string;
  description: string;
  ingredients: Ingredient[];
  preparation: Preparation[];
};
const cld = new Cloudinary({ cloud: { cloudName: "dtn4ucmat" } });

export default function AddRecipe() {
  const [imageId, setImageId] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    description: "",
    ingredients: [],
    preparation: [],
  });

  const addIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { id: uuidv4(), name: "", unit: "", quantity: "" },
      ],
    }));
  };

  const removeIngredient = (id: string) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ing) => ing.id !== id),
    }));
  };

  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string
  ) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing
      ),
    }));
  };

  const addPreparation = () => {
    setRecipe((prev) => ({
      ...prev,
      preparation: [
        ...prev.preparation,
        { id: uuidv4(), text: "", index: prev.preparation.length },
      ],
    }));
  };

  const removePreparation = (id: string) => {
    setRecipe((prev) => ({
      ...prev,
      preparation: prev.preparation
        .filter((prep) => prep.id !== id)
        .map((prep, index) => ({ ...prep, index: index })),
    }));
  };

  const updatePreparation = (id: string, text: string) => {
    setRecipe((prev) => ({
      ...prev,
      preparation: prev.preparation.map((prep) =>
        prep.id === id ? { ...prep, text } : prep
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Burada API'ye gönderme işlemi yapılabilir
    const { data: recipeData, error: recipeError } = await supabase
      .from("recipes")
      .insert([
        {
          title: recipe.title,
          description: recipe.description,
          image: imageId,
        },
      ])
      .select();
    if (recipeError) {
      console.error(recipeError);
      return;
    }

    // Recipe ID fetch
    console.log(recipeData);
    const data = await supabase
      .from("recipes")
      .select("*")
      .eq("title", recipe.title);
    const recipeID: string = data.data[0].id;

    // Ingredients insert
    const ingredientsData = recipe.ingredients;

    const fixedIngredients = [];

    for (let i = 0; i < ingredientsData.length; i++) {
      fixedIngredients.push({
        name: ingredientsData[i].name,
        unit: ingredientsData[i].unit,
        quantity: ingredientsData[i].quantity,
        recipe_id: recipeID,
      });
    }

    const x = await supabase.from("ingredients").insert(fixedIngredients);

    // Prepare data for insert
    const fixedPreparation = [];

    for (let i = 0; i < recipe.preparation.length; i++) {
      fixedPreparation.push({
        text: recipe.preparation[i].text,
        recipe_id: recipeData[0].id,
        index: i,
      });
    }

    const y = await supabase.from("preparation").insert(fixedPreparation);

    // Reset form
    setRecipe({
      title: "",
      description: "",
      ingredients: [],
      preparation: [],
    });
  };

  const myImage = cld.image(imageId);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Yeni Tarif Ekle</CardTitle>
        </CardHeader>
        <CloudinaryUploadWidget
          uwConfig={{ cloudName: "dtn4ucmat", uploadPreset: "flavor-fusion" }}
          setPublicId={setImageId}
        />
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tarif Başlığı</Label>
            <Input
              id="title"
              value={recipe.title}
              onChange={(e) =>
                setRecipe((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Tarif Açıklaması</Label>
            <Textarea
              id="description"
              value={recipe.description}
              onChange={(e) =>
                setRecipe((prev) => ({ ...prev, description: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Malzemeler</Label>
            {recipe.ingredients.map((ing, index) => (
              <Card key={ing.id} className="p-4">
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="Malzeme adı"
                    value={ing.name}
                    onChange={(e) =>
                      updateIngredient(ing.id, "name", e.target.value)
                    }
                    required
                  />
                  <Input
                    placeholder="Birim"
                    value={ing.unit}
                    onChange={(e) =>
                      updateIngredient(ing.id, "unit", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Miktar"
                    value={ing.quantity}
                    onChange={(e) =>
                      updateIngredient(ing.id, "quantity", e.target.value)
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="mt-2"
                  onClick={() => removeIngredient(ing.id)}
                >
                  <Minus className="w-4 h-4 mr-1" /> Malzemeyi Kaldır
                </Button>
              </Card>
            ))}
            <Button type="button" onClick={addIngredient} className="w-full">
              <Plus className="w-4 h-4 mr-1" /> Malzeme Ekle
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Hazırlama Adımları</Label>
            {recipe.preparation.map((prep, index) => (
              <Card key={prep.id} className="p-4">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{index + 1}.</span>
                  <Textarea
                    value={prep.text}
                    onChange={(e) => updatePreparation(prep.id, e.target.value)}
                    placeholder="Hazırlama adımını yazın"
                    required
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="mt-2"
                  onClick={() => removePreparation(prep.id)}
                >
                  <Minus className="w-4 h-4 mr-1" /> Adımı Kaldır
                </Button>
              </Card>
            ))}
            <Button type="button" onClick={addPreparation} className="w-full">
              <Plus className="w-4 h-4 mr-1" /> Hazırlama Adımı Ekle
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Tarifi Kaydet
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
