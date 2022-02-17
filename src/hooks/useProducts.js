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
  const [productsByTerm, setProductByTerm] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let results = [];

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

  const productByCategoryApi = async (
    page,
    categoryId,
    searchTerm,
    isRefreshed = false
  ) => {
    try {
      const response = await aluf.get("/products", {
        params: {
          page: page,
          per_page: 10,
          category: categoryId,
          search: searchTerm,
        },
      });
      if (searchTerm === "") {
        setProductByTerm([]);
        if (isRefreshed) {
          setProducts((oldProducts) => oldProducts);
        } else {
          setProducts((oldProducts) => [...oldProducts, ...response.data]);
        }
      } else {
        // setProducts(response.data);
        setProducts([]);
        setProductByTerm(response.data);
      }
      setIsLoading(false);
      // setProducts(response.data);
    } catch (err) {
      setErrorMessage("Could not get data");
    }
  };

  const productApi = async (
    page,
    per_page = 10,
    searchTerm,
    isRefreshed = false,
    related = []
  ) => {
    try {
      const response = await aluf.get("/products", {
        params: {
          page: page,
          per_page: per_page,
          search: searchTerm,
          include: related,
          // search: searchTerm !== "" ? searchTerm : "",
        },
      });
      if (searchTerm === "") {
        setProductByTerm([]);
        if (isRefreshed) {
          setProducts((oldProducts) => oldProducts);
        } else {
          setProducts((oldProducts) => [...oldProducts, ...response.data]);
        }
      } else {
        // setProducts(response.data);
        setProducts([]);
        setProductByTerm(response.data);
      }

      setIsLoading(false);
      // await aluf
      //   .get("/products", {
      //     params: {
      //       page: page,
      //       per_page: 10,
      //       search: searchTerm,
      //     },
      //   })
      //   .then((response) => {
      //     // setProducts(response.data);
      //     return response.data;
      //   })
      //   .then((response) => {
      //     cb(response);
      //   });
      // results.push(response.data);
      // setProducts(results);

      // setProducts((oldProducts) => [...oldProducts, ...response.data]);
      // setProducts(response.data);
    } catch (err) {
      setErrorMessage("Could not get data");
    }
  };

  const searchProductApi = async (page, searchTerm, cb) => {
    try {
      await aluf
        .get("/products", {
          params: {
            page: page,
            per_page: 10,
            search: searchTerm,
          },
        })
        .then((response) => {
          // setProducts(response.data);
          return response.data;
        })
        .then((response) => {
          cb(response);
        });
      // results.push(response.data);
      // setProducts(results);

      // setProducts((oldProducts) => [...oldProducts, ...response.data]);
      // setProducts(response.data);
    } catch (err) {
      setErrorMessage("Could not get data");
    }
  };

  // useEffect(() => {
  //   // allCategoryApi()
  //   //   .then((category) => {
  //   //     productApi("");
  //   //   })
  //   //   .catch((err) => {});
  //   productApi("");
  // }, []);

  return [
    productApi,
    productByCategoryApi,
    products,
    productsByTerm,
    isLoading,
    errorMessage,
  ];
};
