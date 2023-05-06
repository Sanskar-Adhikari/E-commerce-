import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { clearErrors, createProduct } from "../../actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import TopHeading from "../TopHeading.js";
import { useNavigate } from "react-router-dom";



/**/
/*
NewProduct()
NAME
    NewProduct
SYNOPSIS
    NewProduct();
    No props passed.
DESCRIPTION
    This is a React component that renders a form for creating a new product. It includes input fields for the 
    product name, price, description, category, stock, and images, as well as logic for handling form submissions and displaying error and success messages.
RETURNS
    Returns the JSX for creating NewProduct.
*/
/**/
const NewProduct = () => {
  // Define an array of categories
  const categories = [
    "Books",
    "Notes",
    "Study Material",
    "Research Papers",
    "Study Guides",
    "Devices",
    "Shoes",
    "DormItems",
  ];

  // Set up hooks and state variables
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // Set up an effect hook to handle changes in error and success state variables
  useEffect(() => {
    if (error) 
    {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) 
    {
      alert.success("Product Created");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  // Define a function to handle the submission of a new product
  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    // Create a new form data object
    const myForm = new FormData();

    // Set the form data fields
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    // Add the product images to the form data object
    images.forEach((image) => {
      myForm.append("images", image);
    });
    // Dispatch the createProduct action with the form data object
    dispatch(createProduct(myForm));
  };

  // Define a function to handle changes in the product images
  const createProductImagesChange = (e) => {
    // Create a copy of the selected files
    const files = Array.from(e.target.files);

    // Clear the images and image previews state variables
    setImages([]);
    setImagesPreview([]);

    // Loop through the selected files and create a preview image for each one
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      {/* This is a form to create a new product */}
      <TopHeading title="New Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>
            {/* Input fields to collect product information */}
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            {/* Input field to upload product images */}
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>
            {/* Preview of selected product images */}
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            {/* Submit button to create the product. */}
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
/* NewProduct(); */

export default NewProduct;
