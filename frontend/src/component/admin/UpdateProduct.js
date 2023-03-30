import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import TopHeading from "../TopHeading.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


/**/
/*
UpdateProduct()
NAME
    UpdateProduct 
SYNOPSIS
    UpdateProduct();
DESCRIPTION
    This function gives jsx to update a product. It takes user input for the new product details and sends a 
    request to the server to update the product in the database. Once the product is successfully updated, the function displays a success message to the user.
RETURNS
    Returns the JSX for the UpdateProduct .
*/
/**/
const UpdateProduct = () => {
  // Define an array of product categories
  const categories = [
    "Books",
    "Notes",
    "StudyMaterial",
    "Past Papers",
    "Study Guides",
    "laptop",
    "SmartPhones",
    "Shoes",
    "DormItems",
  ];

  // Extract the id parameter from the URL
  const { id } = useParams();
  const productId = id;

  // Import necessary hooks and functions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  // Extract necessary data from the Redux store
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const { error, product } = useSelector((state) => state.productDetails);

  // Define state variables and initialize them with default values
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  // Use the useEffect hook to handle the initial load of the page and to update the state variables when necessary
  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    productId,
    product,
    updateError,
    navigate,
  ]);

  // Handle form submission to update the product
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  // Handle changes to the product images
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files); //copy of array

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          // If the FileReader is done reading the file
          setImagesPreview((old) => [...old, reader.result]); // Add the preview image to the imagesPreview state variable
          setImages((old) => [...old, reader.result]); // Add the image to the images state variable
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      {/* Component that displays a heading */}
      <TopHeading title="New Product" />
      <div className="dashboard shippinginfo">
        {/* Component that displays a sidebar */}
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            {/* Input for the product name */}
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Input for the product price */}
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price || ""}
              />
            </div>

            {/* Input for the product description */}
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            {/* Select input for the product category */}
            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Choose Category</option>
                {/* Maps through an array of categories to display options */}
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            {/* Input for the product stock */}
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock || ""}
              />
            </div>

            {/* Input for product images */}
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            {/* Displays previously uploaded images */}
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="old Product Preview" />
                ))}
            </div>

            {/* Displays images selected by the user */}
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            {/* Button to submit the form */}
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
/* UpdateProduct(); */

export default UpdateProduct;
