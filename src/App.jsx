import { useState, useEffect } from "react";

function App() {
  const APP_ID = import.meta.env.VITE_APPLICATION_ID;
  const APP_KEY = import.meta.env.VITE_APPLICATION_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("cookies");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <>
      <div className="navbar bg-base-100 border border-slate-100 rounded-md mb-4">
        <div className="flex-1 flex items-center justify-center">
          <a className="btn btn-ghost text-xl">MY-RECIPE</a>
        </div>
        <div className="flex-none gap-2 mx-auto center-input">
          <div className="form-control">
            <div className="flex items-center ">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-32 sm:w-auto"
                value={search}
                onChange={updateSearch}
              />
              <button
                className="btn btn-success btn-outline ml-2"
                type="submit"
                onClick={getSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="gallery">
        {recipes.map((recipe) => (
          <div className="card card-compact w-96 bg-base-100 shadow-xl border-white border">
            <figure className="m-0">
              <img
                src={recipe.recipe.image}
                alt={recipe.recipe.label}
                className="w-[100%] h-[300px]"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-bold">{recipe.recipe.label}</h2>
              <p>
                {recipe.recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.foodId || ingredient.text}>
                    {ingredient.text}
                  </li>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer footer-center p-4 bg-base-100 text-base-content border border-white rounded-md">
        <aside>
          <p className="text-lg">
            Made by{" "}
            <span className="text-xl font-semibold text-blue-800">Usman</span>
          </p>
        </aside>
      </footer>
    </>
  );
}

export default App;
