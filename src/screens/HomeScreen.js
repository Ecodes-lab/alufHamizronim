import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import SearchBar from "../components/SearchBar";
import aluf from "../api/aluf";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
import ProductContext from "../context/ProductContext";
// import { strings } from "../services/translation";
import ModalPopup from "../components/ModalPopup";

const categories = [
  {
    id: 0,
    // icon: require("../../assets/images/icons17.svg"),
    icon: require("../../assets/images/icons17.png"),
    name: "ריהוט קומפלט",
    catId: -1,
    link: "",
  },
  {
    id: 1,
    icon: require("../../assets/images/icons15-1.png"),
    name: "שידות",
    catId: 510,
    link: "",
  },
  {
    id: 2,
    icon: require("../../assets/images/icons16.png"),
    name: "מיטות עם ארגז",
    catId: 501,
    link: "",
  },
  {
    id: 3,
    icon: require("../../assets/images/icons14.png"),
    name: "מיטות נוער",
    catId: 493,
    link: "",
  },
  {
    id: 4,
    icon: require("../../assets/images/icons11.png"),
    name: "סלונים פינתיים",
    catId: 478,
    link: "",
  },
  {
    id: 5,
    icon: require("../../assets/images/icons10.png"),
    name: "כורסאות",
    catId: 547,
    link: "",
  },
  {
    id: 6,
    icon: require("../../assets/images/icons6.png"),
    name: "תמונות מהבית שלכם",
    catId: 576,
    link: "",
  },
  {
    id: 7,
    icon: require("../../assets/images/icons5.png"),
    name: "אקססוריז",
    catId: 563,
    link: "",
  },
  {
    id: 8,
    icon: require("../../assets/images/icons13.png"),
    name: "מיטות יהודיות",
    catId: 503,
    link: "",
  },
  {
    id: 9,
    icon: require("../../assets/images/icons12.png"),
    name: "בסיסי מיטה",
    catId: 476,
    link: "",
  },
  {
    id: 10,
    icon: require("../../assets/images/icons2.png"),
    name: "חדרי שינה",
    catId: 490,
    link: "",
  },
  {
    id: 11,
    icon: require("../../assets/images/icons4.png"),
    name: "ארונות",
    catId: 556,
    link: "",
  },
  {
    id: 12,
    icon: require("../../assets/images/icons7.png"),
    name: "מזרנים זוגיים",
    catId: 498,
    link: "",
  },
  {
    id: 13,
    icon: require("../../assets/images/icons3.png"),
    name: "פינות אוכל",
    catId: 557,
    link: "",
  },
  {
    id: 14,
    icon: require("../../assets/images/icons.png"),
    name: "מיטות זוגיות",
    catId: 472,
    link: "",
  },
  {
    id: 15,
    icon: require("../../assets/images/icons9.png"),
    name: "מזנון ושולחן סלון",
    catId: 545,
    link: "",
  },
  {
    id: 16,
    icon: require("../../assets/images/icons1.png"),
    name: "ספות",
    catId: 548,
    link: "",
  },
  {
    id: 17,
    icon: require("../../assets/images/icons8.png"),
    name: "מיטות יחיד",
    catId: 468,
    link: "",
  },
];

const HomeScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [date, setDate] = useState("");

  // const [products, setProducts] = useState([]);
  // const [productsByTerm, setProductByTerm] = useState([]);
  // const [searchedProducts, setSearchedProducts] = useState([]);

  const value = useContext(ProductContext);
  // const [filteredProduct, setFilteredProduct] = useState([]);
  // const [
  //   allCategoryApi,
  //   parentCategoryApi,
  //   getCategoryApi,
  //   categories,
  //   // category,
  //   catErrorMessage,
  // ] = useCategories();
  const [
    productApi,
    productByCategoryApi,
    products,
    productsByTerm,
    isLoading,
    errorMessage,
  ] = useProducts();

  // const filterProductsByCategory = (categoryId) => {
  //   return products.filter((product) => {
  //     // console.log(product.categories.id);
  //     // if (categoryId in product.categories)
  //     return product.categories.filter((category) => {
  //       // console.log(categoryId);
  //       // if (category.id != categoryId) {
  //       //   console.log(category.id);
  //       // }
  //       return category.id === categoryId;
  //     });
  //   });
  //   // productCategories.map((category) => {
  //   //   console.log(category);
  //   // });
  //   // return productCategories.filter((category) => {
  //   //   return products.filter(product => {
  //   //     // return product.
  //   //   })
  //   // });
  // };

  const getProducts = () => {
    productApi(page, "");
    return products.map((product) => {
      return product.date_created;
    });
  };

  const loadMoreResults = () => {
    if (!term) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (!term) {
      productApi(page, 10, "", false);
    }

    const interval = setInterval(() => {
      if (!term) {
        productApi(page, 10, "", true);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);

  // useEffect(() => {
  //   productApi(page, term);
  // }, [page]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        term={term}
        onTermChange={(newTerm) =>
          setTerm(() => {
            setPage(1);
            return newTerm;
          })
        }
        onTermSubmit={() => productApi(page, 10, term, false)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {/* <Text>We have found {categories.length} results</Text> */}
      {/* <Button
        title="Something"
        onPress={() => {
          navigation.navigate("Products");
        }}
      /> */}
      {/* <ScrollView nestedScrollEnabled={true}> */}
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
        products={productsByTerm.length === 0 ? products : productsByTerm}
        // products={products}
        // title={category.item.name}
        isLoading={isLoading}
        navigation={navigation}
        loadMoreResults={loadMoreResults}
      />
      {/* </ScrollView> */}
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
