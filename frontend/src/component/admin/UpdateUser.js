import React, { Fragment, useEffect, useState } from 'react'
import "./newProduct.css"
import { clearErrors } from "../../actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import TopHeading from '../TopHeading.js';
import {useNavigate, useParams } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import {getUserDetails, updateUser} from "../../actions/UserAction"
import LoadingScreen from '../LoadingComponent/LoadingScreen';

const UpdateUser = () => {

    const navigate=useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading:updateLoading, error:updateError, isUpdated } = useSelector((state) => state.profile);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const {id}= useParams();
    const userId= id;
    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
          } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);

            
          }
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(error);
            dispatch(clearErrors());
          }
        if (isUpdated) {
          alert.success("User Updated!");
          navigate("/admin/users");
          dispatch({ type: UPDATE_USER_RESET });
        }
      }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

      const updateUserSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        dispatch(updateUser(userId, myForm));
      };



  return (
    <Fragment>
        <TopHeading title="Update User"/>
        <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading? <LoadingScreen/>:
          <form
          className="createProductForm"
          onSubmit={updateUserSubmitHandler}
        >
          <h1>Update User</h1>

          <div>
            <PersonIcon />
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div>
            <VerifiedUserIcon />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Update Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>


            </select>
          </div>



          <Button
            id="createProductBtn"
            type="submit"
            disabled={updateLoading ? true : false || role===""?true:false}
          >
            Update user
          </Button>
        </form>}
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateUser