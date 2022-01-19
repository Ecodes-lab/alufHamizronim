import React, { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const ProductDetails = ({ product, imageStyle }) => {
  // const [image, ]

  // const image =
  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, { ...imageStyle }]}
        source={{ uri: product.images[0].src }}
      />
      <Text style={styles.name}>{product.name}</Text>
      <Text>{product.price} ₪</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    // marginRight: 15,
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
  },
});

export default ProductDetails;
