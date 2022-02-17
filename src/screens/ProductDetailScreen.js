import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import aluf from "../api/aluf";
import ProductDetail from "../components/ProductDetail";
import ProductList from "../components/ProductList";
import QuoteForm from "../containers/QuoteForm";
import useProducts from "../hooks/useProducts";

const ProductDetailScreen = ({ route, navigation }) => {
  const [product, setProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [
    productApi,
    productByCategoryApi,
    products,
    productsByTerm,
    isLoading,
    errorMessage,
  ] = useProducts();
  const { productId, related_ids } = route.params;

  const getProduct = async (id) => {
    const response = await aluf.get(`/products/${id}`);
    setProduct(response.data);
    productApi(page, 4, "", false, response.data.related_ids);
  };

  const loadMoreResults = () => {
    // if (!term) {
    // setPage(page + 1);
    // }
  };

  useEffect(() => {
    getProduct(productId);
  }, []);

  if (!product) {
    return null;
  }

  const regex = /(<([^>]+)>)/gi;
  const description = product.description.replace(regex, "");

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <Text>{product.name}</Text> */}

        <View style={{ alignItems: "center", marginHorizontal: 30 }}>
          <FlatList
            horizontal={true}
            // showsHorizontalScrollIndicator={false}
            data={product.images}
            keyExtractor={(photo) => photo.id}
            renderItem={({ item }) => {
              return (
                <Image style={styles.productImg} source={{ uri: item.src }} />
              );
              // return <ProductDetail product={item} />;
            }}
            pagingEnabled={true}
          />
          {/* <Image
            style={styles.productImg}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3v7KDJN7TAoJa5sFaPWcp1HX8JFcpF3z5K3ngz4L6kWoEP7Ca",
            }}
          /> */}
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price} ₪</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <QuoteForm />
        <View style={{ height: 20 }} />
        <Text style={styles.relatedLabel}>Related Products</Text>
        <ProductList
          products={products}
          isLoading={isLoading}
          navigation={navigation}
          loadMoreResults={loadMoreResults}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: 300,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "bold",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginTop: 10,
    color: "#696969",
  },
  relatedLabel: {
    fontSize: 28,
    color: "#000",
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },
  // image: {
  //   height: 200,
  //   width: 300,
  // },
});

export default ProductDetailScreen;
