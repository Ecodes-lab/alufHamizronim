import { useEffect, useState } from "react";
import aluf from "../api/aluf";
import useCategories from "./useCategories";

export default () => {
  const [
    allCategoryApi,
    parentCategoryApi,
    getCategoryApi,
    categories,
    // category,
    catErrorMessage,
  ] = useCategories();
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  //   const categoryApi = async (searchTerm, parent) => {
  //     try {
  //       const response = await alug.get("/products/categories", {
  //         params: {
  //           per_page: 50,
  //           search: searchTerm,
  //           parent: parent,
  //         },
  //       });
  //     } catch (err) {}
  //   };

  const productApi = async (searchTerm) => {
    try {
      const response = await aluf.get("/products", {
        params: {
          per_page: 20,
          search: searchTerm,
        },
      });
      setProducts(response.data);
    } catch (err) {
      setErrorMessage("Could not get data");
    }
  };

  useEffect(() => {
    allCategoryApi()
      .then((category) => {
        productApi("");
      })
      .catch((err) => {});
  }, []);

  return [productApi, products, categories, errorMessage];
};
