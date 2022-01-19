import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import aluf from "../api/aluf";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
// import { strings } from "../services/translation";

const ProductsScreen = ({ route, navigation }) => {
  const [term, setTerm] = useState("");
  // const [allCategoryApi, parentCategoryApi, categories, catErrorMessage] =
  // useCategories();
  const [productApi, products, productCategories, errorMessage] = useProducts();

  const { categoryId } = route.params;

  const filterProductsByCategory = (catId) => {
    return products.filter((product) => {
      // console.log(product.categories.id);
      return product.categories.filter((category) => {
        // console.log(categoryId);
        if (category.id === catId) {
          // console.log(categoryId);
        }
        return category.id === catId;
      });
    });
    // productCategories.map((category) => {
    //   console.log(category);
    // });
    // return productCategories.filter((category) => {
    //   return products.filter(product => {
    //     // return product.
    //   })
    // });
  };

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => productApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {/* <Text>We have found {categories.length} results</Text> */}
      {/* <Button
        onPress={() => {
          changeLaguage("en");
        }}
      /> */}
      {/* <FlatList
        data={productCategories}
        renderItem={(category) => {
          console.log(category.item.name);
          return (
            <ResultsList
              key={category.item.id}
              results={filterProductsByCategory(category.item.id)}
              title={category.item.name}
            />
          );
        }}
        keyExtractor={(category) => category.id}
      /> */}

      {/* {filterProductsByCategory()} */}
      {/* <CategoryList results={categories} /> */}
      <ProductList
        products={filterProductsByCategory(categoryId)}
        navigation={navigation}
      />
      {/* <ResultsList results={filterProductsByCategory()} title="Beds" /> */}
      {/* <ResultsList results={filterProductsByCategory()} title="Bedrooms" /> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductsScreen;
