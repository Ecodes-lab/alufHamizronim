import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import aluf from "../api/aluf";

const ProductDetailScreen = ({ navigation, route }) => {
  const [product, setProduct] = useState(null);
  const { productId } = route.params;

  const getProduct = async (id) => {
    const response = await aluf.get(`/products/${id}`);
    setProduct(response.data);
  };

  useEffect(() => {
    getProduct(productId);
  }, []);

  if (!product) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>{product.name}</Text>
      <FlatList
        horizontal={true}
        // showsHorizontalScrollIndicator={false}
        data={product.images}
        keyExtractor={(photo) => photo.id}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item.src }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 200,
    width: 300,
  },
});

export default ProductDetailScreen;
