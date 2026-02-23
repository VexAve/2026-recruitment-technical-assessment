const request = require("supertest");

describe("Provided Tests", () => {
  describe("Task 1", () => {
    describe("POST /parse", () => {
      const getTask1 = async (inputStr) => {
        return await request("http://localhost:8080")
          .post("/parse")
          .send({ input: inputStr });
      };

      it("example1", async () => {
        const response = await getTask1("Riz@z RISO00tto!");
        expect(response.body).toStrictEqual({ msg: "Rizz Risotto" });
      });

      it("example2", async () => {
        const response = await getTask1("alpHa-alFRedo");
        expect(response.body).toStrictEqual({ msg: "Alpha Alfredo" });
      });

      it("error case", async () => {
        const response = await getTask1("");
        expect(response.status).toBe(400);
      });
    });
  });

  describe("Task 2", () => {
    describe("POST /entry", () => {
      const putTask2 = async (data) => {
        return await request("http://localhost:8080").post("/entry").send(data);
      };

      it("Add Ingredients", async () => {
        const entries = [
          { type: "ingredient", name: "Egg", cookTime: 6 },
          { type: "ingredient", name: "Lettuce", cookTime: 1 },
        ];
        for (const entry of entries) {
          const resp = await putTask2(entry);
          expect(resp.status).toBe(200);
          expect(resp.body).toStrictEqual({});
        }
      });

      it("Add Recipe", async () => {
        const meatball = {
          type: "recipe",
          name: "Meatball",
          requiredItems: [{ name: "Beef", quantity: 1 }],
        };
        const resp1 = await putTask2(meatball);
        expect(resp1.status).toBe(200);
      });

      it("Congratulations u burnt the pan pt2", async () => {
        const resp = await putTask2({
          type: "ingredient",
          name: "beef",
          cookTime: -1,
        });
        expect(resp.status).toBe(400);
      });

      it("Congratulations u burnt the pan pt3", async () => {
        const resp = await putTask2({
          type: "pan",
          name: "pan",
          cookTime: 20,
        });
        expect(resp.status).toBe(400);
      });

      it("Unique names", async () => {
        const resp = await putTask2({
          type: "ingredient",
          name: "Beef",
          cookTime: 10,
        });
        expect(resp.status).toBe(200);

        const resp2 = await putTask2({
          type: "ingredient",
          name: "Beef",
          cookTime: 8,
        });
        expect(resp2.status).toBe(400);

        const resp3 = await putTask2({
          type: "recipe",
          name: "Beef",
          cookTime: 8,
        });
        expect(resp3.status).toBe(400);
      });
    });
  });

  describe("Task 3", () => {
    describe("GET /summary", () => {
      const postEntry = async (data) => {
        return await request("http://localhost:8080").post("/entry").send(data);
      };

      const getTask3 = async (name) => {
        return await request("http://localhost:8080").get(
          `/summary?name=${name}`,
        );
      };

      it("What is bro doing - Get empty cookbook", async () => {
        const resp = await getTask3("nothing");
        expect(resp.status).toBe(400);
      });

      it("What is bro doing - Get ingredient", async () => {
        const resp = await postEntry({
          type: "ingredient",
          name: "beef",
          cookTime: 2,
        });
        expect(resp.status).toBe(200);

        const resp2 = await getTask3("beef");
        expect(resp2.status).toBe(400);
      });

      it("Unknown missing item", async () => {
        const cheese = {
          type: "recipe",
          name: "Cheese",
          requiredItems: [{ name: "Not Real", quantity: 1 }],
        };
        const resp1 = await postEntry(cheese);
        expect(resp1.status).toBe(200);

        const resp2 = await getTask3("Cheese");
        expect(resp2.status).toBe(400);
      });

      it("Bro cooked", async () => {
        const meatball = {
          type: "recipe",
          name: "Skibidi",
          requiredItems: [{ name: "Bruh", quantity: 1 }],
        };
        const resp1 = await postEntry(meatball);
        expect(resp1.status).toBe(200);

        const resp2 = await postEntry({
          type: "ingredient",
          name: "Bruh",
          cookTime: 2,
        });
        expect(resp2.status).toBe(200);

        const resp3 = await getTask3("Skibidi");
        expect(resp3.status).toBe(200);
      });
    });
  });
});

describe("Dylan's Tests", () => {
  describe("Task 1", () => {
    const parseInput = async (input) => {
      return await request("http://localhost:8080")
        .post("/parse")
        .send({ input });
    };

    test.each(["", "        ", "-_!@#$%^&*()"])(
      "error on empty string: '%s'",
      async (input) => {
        const res = await parseInput(input);
        expect(res.status).toBe(400);
      },
    );

    test.each([
      ["Food-Number-One", "Food Number One"],
      ["Food_Number_Two", "Food Number Two"],
      ["-_Food--Number__Three_-", "Food Number Three"],
    ])(
      "replace hyphens and underscores with whitespaces: '%s'",
      async (input, msg) => {
        const res = await parseInput(input);
        expect(res.body).toStrictEqual({ msg });
      },
    );

    test.each([
      ["Foo0d Number 1O0ne3", "Food Number One"],
      ["F!o@o#d$_%N^u&m*b(e)r+-=T{w}o:", "Food Number Two"],
      ["\nFood \tNumber \\Three", "Food Number Three"],
    ])(
      "remove characters that aren't letters or whitespaces: '%s'",
      async (input, msg) => {
        const res = await parseInput(input);
        expect(res.body).toStrictEqual({ msg });
      },
    );

    test.each([
      ["food number one", "Food Number One"],
      ["fOoD nUmBeR tWo", "Food Number Two"],
      ["fOOd nUMBER tHREE", "Food Number Three"],
    ])(
      "capital first letters, lowercase for other letters: '%s'",
      async (input, msg) => {
        const res = await parseInput(input);
        expect(res.body).toStrictEqual({ msg });
      },
    );

    test.each([
      ["Food  Number  One", "Food Number One"],
      ["   Food---Number___Two   ", "Food Number Two"],
      ["_- _- Food _- _- Number _- _- Three _- _-", "Food Number Three"],
    ])(
      "remove extra whitespaces: '%s'",
      async (input, msg) => {
        const res = await parseInput(input);
        expect(res.body).toStrictEqual({ msg });
      },
    );
  });
});
