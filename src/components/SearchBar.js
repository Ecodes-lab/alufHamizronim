import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "react-native-vector-icons";

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.backgroundStyle}>
      <TouchableOpacity style={styles.iconContainer} onPress={onTermSubmit}>
        <Feather name="search" style={styles.iconStyle} />
      </TouchableOpacity>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search...."
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
        // returnKeyLabel="search"
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 15,
    // backgroundColor: "#F0EEEE",
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 5,
    shadowColor: "#000",
    // shadowOffset: ,
    marginHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconContainer: {
    alignSelf: "center",
  },
  iconStyle: {
    fontSize: 35,
    marginHorizontal: 15,
  },
});

export default SearchBar;
