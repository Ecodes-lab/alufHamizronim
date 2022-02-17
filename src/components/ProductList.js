import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import ProductDetails from "./ProductDetails";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const tileSize = screenWidth / numColumns - 25;

const ProductList = ({
  navigation,
  title,
  products,
  loadMoreResults,
  isLoading,
}) => {
  // const [data, setData] = useState([])
  if (!products.length) {
    return null;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView style={[styles.container, {}]}>
      <View style={[styles.inputContainer, {}]}>
        {/* {title ? <Text style={styles.titleStyle}>{title}</Text> : null} */}
        {/* <Text>products: {products.length}</Text> */}
        {products ? (
          <FlatList
            // style={{ alignContent: "center" }}
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
            data={products}
            renderItem={({ item }) => {
              // console.log(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.productStyle}
                  onPress={() =>
                    navigation.navigate("ProductDetail", {
                      productId: item.id,
                      relatedProducts: item.related_ids,
                    })
                  }
                >
                  <ProductDetails
                    product={item}
                    imageStyle={{ width: tileSize }}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(product) => product.id}
            numColumns={2}
            onEndReachedThreshold={0.01}
            onEndReached={(info) => {
              loadMoreResults(info);
            }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 10,
    // marginHorizontal: 15,
  },
  inputContainer: {
    // alignItems: "center",
    // marginHorizontal: 15,
    // width: screenWidth - 50,
  },
  productStyle: {
    // flex: 0.5,
    // marginLeft: 5,
    marginRight: 10,
    width: tileSize,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default ProductList;
