import MealItem from "./MealItem";
import { FlatList, StyleSheet, View } from "react-native";

function MealsList({ items, onPressHandler }) {
  function renderMealItem(item) {
    return (
      <MealItem
        title={item.item.title}
        imageUrl={item.item.imageUrl}
        duration={item.item.duration}
        complexity={item.item.complexity}
        affordability={item.item.affordability}
        onPress={
          onPressHandler ? () => onPressHandler(item.item.id) : undefined
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderMealItem(item)}
      />
    </View>
  );
}

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
