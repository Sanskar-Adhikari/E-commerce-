import React, {  useState, useEffect } from 'react';
import './Login.css';
import logos from '../UserLogin/logoa.jpeg';
import {clearErrors, resetPassword} from "../../actions/UserAction"
import {useAlert} from "react-alert";
import{useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import TopHeading from '../TopHeading';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from "@material-ui/icons/Lock";
import LoadingScreen from '../LoadingComponent/LoadingScreen';
import { useParams } from 'react-router-dom';



const ResetPassword = ({match}) => {
    const { token } = useParams();

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {error, success, loading}= useSelector((state)=>state.forgotPassword)
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");



    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('password', password);
        myForm.set('confirmPassword', confirmPassword);
        dispatch(resetPassword(token, myForm));
      };




      useEffect(()=>{ 
        if(error){
          alert.error(error);
          dispatch(clearErrors());
        }
        if(success)
        {
          alert.success("Password update success")
          navigate("/login");
        }
       },[alert, dispatch, error, navigate, success])

    return (
    
        <div>
        {loading? <LoadingScreen />:(
        <div>
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
                  onSubmit={resetPasswordSubmit}
                >
    
                  <div className="form-item">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
    
                  <div className="form-item">
                    <LockIcon />
                    <input
                      type="password"
                      placeholder="Re-enter"
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
           
          )}
       </div>
      )
}

export default ResetPassword