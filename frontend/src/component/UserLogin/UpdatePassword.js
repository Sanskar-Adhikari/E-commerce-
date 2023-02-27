import React, {  useState, useEffect } from 'react';
import './Login.css';
import logos from '../UserLogin/logoa.jpeg';
import {clearErrors, updatePassword, loadUser} from "../../actions/UserAction"
import {useAlert} from "react-alert";
import{useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import TopHeading from '../TopHeading';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LoadingScreen from '../LoadingComponent/LoadingScreen';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {error, isUpdated, loading}= useSelector((state)=>state.profile)
    const [oldPassword, setOldPassword]= useState("");
    const [newPassword, setNewPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");



    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('oldPassword', oldPassword);
        myForm.set('newPassword', newPassword);
        myForm.set('confirmPassword', confirmPassword);
        dispatch(updatePassword(myForm));
      };




      useEffect(()=>{ 
        if(error){
          alert.error(error);
          dispatch(clearErrors());
        }
        if(isUpdated)
        {
          alert.success("Password update success")
          navigate("/account");
          dispatch({
            type:UPDATE_PASSWORD_RESET,
          })
        }
       },[alert, dispatch, error, isUpdated, navigate])

  return (
    
    <div>
    {loading? <LoadingScreen />:<div>
    <TopHeading title="UPDATE PASSWORD"/>                 
         <div className="top login-card-container">
          <div className="login-card">
          <div className="login-card-logo">
              <img src={logos} alt="logo"/>
          </div>
          <div className="login-card-header">
              <h1>Update Profile</h1>
          </div>
          <form
              className="updateform login-card-form shiftToNeutralForm "
              encType="multipart/form-data"
              onSubmit={updatePasswordSubmit}
            >
<div className="form-item">
                <VpnKeyIcon />
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="form-item">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-item">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Re-enter New Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>


              <input type="submit" value="Update" className="loginBtn" />
            </form>
          </div>
          </div>
          </div>
       
      }
   </div>
  )
}

export default UpdatePassword