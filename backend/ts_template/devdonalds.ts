import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  type: "recipe";
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  type: "ingredient";
  cookTime: number;
}

interface recipeSummary {
  name: string;
  cookTime: number;
  ingredients: requiredItem[];
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: Record<string, recipe | ingredient> = {};

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  // Replace hyphens and underscores with whitespace
  recipeName = recipeName.replace(/[-_]/g, " ");

  // Remove characters that are not letters or whitespaces
  recipeName = recipeName.replace(/[^a-zA-Z\s]/g, "");

  // Remove leading and trailing whitespace
  recipeName = recipeName.trim();

  // Squash multiple whitespaces between words into a single whitespace
  recipeName = recipeName.replace(/\s+/, " ");

  // Uppercase for the first letter of each word, lowercase for the rest
  recipeName = recipeName
    .split(" ")
    .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase())
    .join(" ");

  // Return null if recipeName is an empty string
  return recipeName || null;
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
const addCookbookEntry = (entry: recipe | ingredient): void => {
  if (entry.type !== "recipe" && entry.type !== "ingredient") {
    throw new Error("type can only be 'recipe' or 'ingredient'");
  } else if (entry.type === "ingredient" && entry.cookTime < 0) {
    throw new Error("cookTime can only be greater than or equal to 0");
  } else if (Object.values(cookbook).some((item) => item.name === entry.name)) {
    throw new Error("entry names must be unique");
  } else if (
    entry.type === "recipe" &&
    entry.requiredItems.length !==
      new Set(
        entry.requiredItems.map((item: requiredItem) => item.name),
      ).size
  ) {
    throw new Error("recipe requiredItems can only have one element per name");
  } else {
    cookbook[entry.name] = entry;
  }
}

app.post("/entry", (req: Request, res: Response) => {
  try {
    addCookbookEntry(req.body);
    res.json({});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
const summarize_recipe = (name: string): recipeSummary => {
  if (!cookbook[name]) {
    throw new Error("a recipe with the corresponding name cannot be found");
  } else if (cookbook[name].type !== "recipe") {
    throw new Error("the searched name is NOT a recipe name")
  }

  let cookTime = 0;
  const ingredientsMap: Record<string, number> = {};

  let stack = [{ name, quantity: 1 }];
  while (stack.length) {
    const currNode = stack.pop();
    const currEntry = cookbook[currNode.name];

    if (!currEntry) {
      throw new Error(
        "the recipe contains recipes or ingredients that aren't in the cookbook"
      );
    }

    if (currEntry.type === "recipe") {
      stack = stack.concat(currEntry.requiredItems);
    } else {
      cookTime += currEntry.cookTime * currNode.quantity;
      ingredientsMap[currNode.name] = (ingredientsMap[currNode.name] || 0) + currNode.quantity;
    }
  }

  const ingredients = Object.entries(ingredientsMap).map(
    ([key, value]) => ({ name: key, quantity: value }),
  );

  return { name, cookTime, ingredients };
}

app.get("/summary", (req: Request, res: Request) => {
  try {
    res.json(summarize_recipe(req.query.name));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
