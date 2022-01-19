import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import translate from "../services/translation";

const CategoryList = ({ navigation, categories }) => {
  const [color, setColor] = useState("");
  //   console.log(results);

  //   const categories = categories.map((category) => {
  //     return (
  //       <TouchableOpacity
  //         key={category.id}
  //         style={styles.categoryStyle}
  //         onPress={() =>
  //           navigation.navigate("Products", {
  //             categoryId: category.id,
  //           })
  //         }
  //       >
  //         <Text style={styles.titleStyle}>{category.name}</Text>
  //       </TouchableOpacity>
  //     );
  //   });

  //   let r = ["1", "2"];

  //   console.log(r.preppend("0"));

  return (
    // <ScrollView style={styles.container}>{categories}</ScrollView>
    <View>
      <FlatList
        style={styles.list}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // data={[{ name: "All", id: -1 }, ...categories]}
        data={categories}
        renderItem={(category) => {
          //   console.log(translate.t("ok"));
          return (
            <TouchableOpacity
              key={category.item.id}
              style={styles.categoryStyle}
              onPress={() =>
                navigation.navigate("Products", {
                  categoryId: category.item.id,
                })
              }
            >
              <Text style={styles.titleStyle}>{category.item.name}</Text>
            </TouchableOpacity>
            //   <Text style={styles.titleStyle} key={category.item.id}>
            //     {category.item.name}
            //   </Text>
          );
        }}
        keyExtractor={(category) => category.id}
      />
    </View>
    // <FlatList
    //   style={styles.list}
    //   horizontal={true}
    //   data={[{ name: "All" }, ...results]}
    //   renderItem={(category) => {
    //     return (
    //       <TouchableOpacity
    //         key={category.item.id}
    //         style={[
    //           styles.categoryStyle,
    //           { backgroundColor: color == "" ? color : "" },
    //         ]}
    //         onPress={() =>

    //             onCategoryClick()
    //         //   navigation.navigate("Products", {
    //         //     categoryId: category.item.id,
    //         //   })
    //         }
    //       >
    //         <Text style={styles.titleStyle}>{category.item.name}</Text>
    //       </TouchableOpacity>
    //       //   <Text style={styles.titleStyle} key={category.item.id}>
    //       //     {category.item.name}
    //       //   </Text>
    //     );
    //   }}
    //   keyExtractor={(category) => category.id}
    // />
  );
};

const styles = StyleSheet.create({
  constainer: {
    alignItems: "center",
    // flexDirection: "row",
  },
  list: {
    marginBottom: 10,
  },
  categoryStyle: {
    // flex: 0.5,
    // justifyContent: "center",
    // alignSelf: "center",
    // backgroundColor: "#b2ff93",
    // backgroundColor: "#fff",
    // marginHorizontal: 5,
    // marginVertical: 5,
    // padding: 5,
    // borderRadius: 10,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 20,
    borderRadius: 10,
    // height: 100,
    // width: 200,
  },
  titleStyle: {
    // alignSelf: "center",
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CategoryList;
