import React, { useState , useEffect} from 'react'
import LoadingScreen from '../LoadingComponent/LoadingScreen'
import TopHeading from '../TopHeading'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './Login.css';
import {clearErrors, forgotPassword} from "../../actions/UserAction"
import {useAlert} from "react-alert";
import{useDispatch, useSelector} from "react-redux";
import logos from '../UserLogin/logoa.jpeg';


const ForgotPassword = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.user)
    const {error, message, loading}= useSelector((state)=>state.forgotPassword)
    const [email, setEmail]= useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email', email);
        dispatch(forgotPassword(myForm));
      };


      useEffect(()=>{
        if(error){
          alert.error(error);
          dispatch(clearErrors());
        }
        if(message)
        {
          alert.success(message)
        }
       },[alert, dispatch, error, message, user])


    return (
    <div>
    {loading? <LoadingScreen />:<div>
    <TopHeading title="FORGOT PASSWORD"/>                 
         <div className="top login-card-container">
          <div className=" login-card">
          <div className="login-card-logo">
              <img src={logos} alt="logo"/>
          </div>
          <div className="login-card-header">
              <h1>Forgot Password</h1>
          </div>
          <form
              className="updateform login-card-form shiftToNeutralForm "
              onSubmit={forgotPasswordSubmit}
            >
              <div className="form-item">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>

              
              <input type="submit" value="Send" className="loginBtn" />
            </form>
          </div>
          </div>
          </div>
       
      }
   </div>


  )
}

export default ForgotPassword