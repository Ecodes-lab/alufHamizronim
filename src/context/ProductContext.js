import React from "react";

const ProductContext = React.createContext();

export const ProductProvider = ({ children }) => {
  return (
    <ProductContext.Provider value={5}>{children}</ProductContext.Provider>
  );
};

export default ProductContext;
