import React from "react";

import classes from "./Meals.module.css";
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummary />;
      <AvailableMeals />
    </React.Fragment>
  );
};
export default Meals;
