import React, {useEffect, useState} from 'react';
import Recipe from './recipe';
import './App.css';

const App = () => {

  const APP_ID = "54ebbaa2";
  const APP_KEY = "6bba83a80b0f025c0b43bf20fb5b2ba9";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input classname='search-bar' type="text" value={search} onChange={updateSearch} />
        <button  className="search-button" type='submit' >Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients} />
      ))}
      </div>
    </div>
  );
};

export default App;
