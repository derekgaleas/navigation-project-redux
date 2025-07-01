import MealsList from "@/components/MealsList/MealsList";
import { MEALS } from "@/data/dummy-data";
import { FavoritesContext } from "@/store/context/favorite-context";
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

function FavoritesScreen({ navigation }) {
  const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealsCtx.ids.includes(meal.id)
  );

  function onPressHandler(id) {
    navigation.navigate("MealDetails", {
      mealId: id,
    });
  }

  return favoriteMeals.length > 0 ? (
    <MealsList items={favoriteMeals} onPressHandler={onPressHandler} />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>You have no favorite meals yet!</Text>
    </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});