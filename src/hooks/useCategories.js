import { useEffect, useState } from "react";
import aluf from "../api/aluf";

export default () => {
  const [categories, setCategories] = useState([]);
  //   const [category, setCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const filterParents = (data) => {
    return data.filter((cat) => {
      //   console.log(cat.id);
      //   if (cat.id > 0) {
      //     console.log(cat.id);
      //   }
      return cat.id > 0;
    });
  };

  const parentCategoryApi = async (parent) => {
    try {
      const response = await aluf.get("/products/categories", {
        params: {
          parent: 0,
          per_page: 100,
        },
      });
      //   console.log(response.data);
      //   filterParents(response.data);
      setCategories(response.data);
      //   setCategories(filterParents(response.data));
    } catch (err) {
      //   console.log(err);
    }
  };

  const allCategoryApi = async () => {
    try {
      const response = await aluf.get("/products/categories", {
        params: {
          //   per_page: 50,
          //   parent: 0,
        },
      });
      setCategories(response.data);
    } catch (err) {
      //   console.log(err);
    }
  };

  const getCategoryApi = async (id) => {
    try {
      const response = await aluf.get(`/products/categories/${id}`);
      setCategory(response.data);
      console.log(category);
    } catch (err) {
      //   console.log(err);
    }
  };

  useEffect(() => {
    allCategoryApi();
    // parentCategoryApi(0);
  }, []);

  return [
    allCategoryApi,
    parentCategoryApi,
    getCategoryApi,
    categories,
    // category,
    errorMessage,
  ];
};
