import React, { useState, useEffect } from "react";
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
  const [page, setPage] = useState(1);
  // const [product, setProduct] = useState(null);
  // const [allCategoryApi, parentCategoryApi, categories, catErrorMessage] =
  // useCategories();
  const [
    productApi,
    productByCategoryApi,
    products,
    productsByTerm,
    isLoading,
    errorMessage,
  ] = useProducts();

  const { categoryId } = route.params;

  const loadMoreResults = () => {
    if (!term) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (!term) {
      productByCategoryApi(page, categoryId == -1 ? "" : categoryId, "", false);
    }
    const interval = setInterval(() => {
      // console.log("This will run every second!");
      // setTerm(term);
      if (!term) {
        productByCategoryApi(
          page,
          categoryId == -1 ? "" : categoryId,
          "",
          true
        );
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() =>
          productByCategoryApi(page, categoryId == -1 ? "" : categoryId, term)
        }
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
        // products={filterProductsByCategory(categoryId)}
        products={productsByTerm.length === 0 ? products : productsByTerm}
        // products={products}
        isLoading={isLoading}
        navigation={navigation}
        loadMoreResults={loadMoreResults}
      />
      {/* <ResultsList results={filterProductsByCategory()} title="Beds" /> */}
      {/* <ResultsList results={filterProductsByCategory()} title="Bedrooms" /> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductsScreen;
