import React, { useEffect, useState, useCallback } from "react";

import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const FetchMeals = () => {
  const [meals, setMeals] = useState([]);

  const postFetching = (data) => {
    const formatMeals = [];
    for (let key in data) {
      formatMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(formatMeals);
  };
  const { commDB: fetchProcess, isLoading, error } = useHttp();

  useEffect(() => {
    fetchProcess(
      {
        url: "https://movies-cc0e3-default-rtdb.firebaseio.com/meals.json",
      },
      postFetching
    );
  }, [fetchProcess]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));

  let content = <p>No Dish available currently</p>;
  if (isLoading) {
    content = <p>Loading....</p>;
  }
  if (error !== null) {
    content = <p>{error}</p>;
  }
  if (meals.length !== 0) {
    content = mealsList;
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export default FetchMeals;
