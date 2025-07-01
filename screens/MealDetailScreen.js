import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import { useLayoutEffect } from "react";
import MealDetails from "@/components/MealDetails";
import SubTitle from "@/components/MealDetail/Subtitle";
import List from "@/components/MealDetail/List";
import IconButton from "@/components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, addFavorite } from "@/store/redux/favorite";

function MealDetailScreen({ route, navigation }) {
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealIds.includes(mealId);

  useLayoutEffect(() => {
    function changeFavoriteStatusHandler() {
      if (mealIsFavorite) {
        dispatch(removeFavorite({ id: mealId }));
      } else {
        dispatch(addFavorite({ id: mealId }));
      }
    }

    navigation.setOptions({
      title: "Details",
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color={"white"}
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, mealIsFavorite, favoriteMealIds, mealId, dispatch]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}> {selectedMeal.title} </Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.outerContainer}>
        <View style={styles.listContainer}>
          <SubTitle> Ingredients </SubTitle>
          <List data={selectedMeal.ingredients} />
          <SubTitle> Steps </SubTitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listContainer: {
    width: "80%",
  },
  outerContainer: {
    alignSelf: "center",
  },
});
