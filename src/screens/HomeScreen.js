import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import aluf from "../api/aluf";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
// import { strings } from "../services/translation";

const HomeScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [
    allCategoryApi,
    parentCategoryApi,
    getCategoryApi,
    categories,
    // category,
    catErrorMessage,
  ] = useCategories();
  const [productApi, products, productCategories, errorMessage] = useProducts();

  const filterProductsByCategory = (categoryId) => {
    return products.filter((product) => {
      // console.log(product.categories.id);
      // if (categoryId in product.categories)
      return product.categories.filter((category) => {
        // console.log(categoryId);
        // if (category.id != categoryId) {
        //   console.log(category.id);
        // }
        return category.id === categoryId;
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

  const getFilteredProduct = (id) => {
    if (id >= 0) {
      setFilteredProduct(filterProductsByCategory(id));
    } else {
      setFilteredProduct([]);
    }
    // parentCategoryApi(0);
    // productApi("");
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => productApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {/* <Text>We have found {categories.length} results</Text> */}
      {/* <Button
        title="Something"
        onPress={() => {
          navigation.navigate("Products");
        }}
      /> */}
      <CategoryList
        categories={categories}
        navigation={navigation}
        // onCategoryClick={(id) => getFilteredProduct(id)}
      />
      {/* <FlatList
        data={productCategories}
        renderItem={(category) => {
          // console.log(category.item.name);
          // something(category.item.id);
          return (
            <ProductList
              key={category.item.id}
              products={
                // filterProductsByCategory(category.item.id)
                !filteredProduct.length
                  ? filterProductsByCategory(category.item.id)
                  : filteredProduct
              }
              // title={category.item.name}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(category) => category.id}
      /> */}

      <ProductList
        // key={category.item.id}
        products={products}
        // title={category.item.name}
        navigation={navigation}
      />
      {/* {filterProductsByCategory()} */}
      {/* <CategoryList results={categories} navigation={navigation} /> */}
      {/* <ResultsList results={filterProductsByCategory("מזרונים")} title="Mattresses" /> */}
      {/* <ResultsList results={filterProductsByCategory()} title="Beds" /> */}
      {/* <ResultsList results={filterProductsByCategory()} title="Bedrooms" /> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
