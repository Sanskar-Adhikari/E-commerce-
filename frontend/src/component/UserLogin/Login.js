import React, { Fragment, useRef, useState, useEffect } from 'react';
import './Login.css';
import LoadingScreen from '../LoadingComponent/LoadingScreen';
import { Link } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import logos from '../UserLogin/logoa.jpeg';
import {clearErrors, login, register} from "../../actions/UserAction"
import FaceIcon from '@material-ui/icons/Face';
import {useAlert} from "react-alert";
import{useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import TopHeading from '../TopHeading';
import { useLocation } from 'react-router-dom';


const Login = () => {

const alert = useAlert();
const {error, loading, isAuth} = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', user.name);
    myForm.set('password', user.password);
    myForm.set('email', user.email);
    myForm.set('avatar', avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState('/logo192.png');
  const [isLoginHidden, setIsLoginHidden] = useState(false);
  const location = useLocation();

 const redirect=location.search ? location.search.split("=")[1]: "/account";
console.log(redirect);
 useEffect(()=>{
  if(error){
    alert.error(error);
    dispatch(clearErrors());
  }
  if(isAuth)
  { 
    //console.log(location);
    navigate(redirect)
  }
 },[alert, dispatch, error, isAuth, navigate, redirect, location])
  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.remove('shiftToRight');
      registerTab.current.classList.remove('shiftToNeutralForm');
      setIsLoginHidden(false); // show login form

    }

    if (tab === 'register') {
      registerTab.current.classList.add('shiftToNeutralForm');
      setIsLoginHidden(true); // hide login form

    }
  };
  return (

    <Fragment>
      {loading? <LoadingScreen/> : 
      <Fragment>
           <TopHeading title="LOGIN"/>                 

      <Fragment>
        <div className="top login-card-container">
          <div className="login-card">
          <div className="login-card-logo">
              <img src={logos} alt="logo"/>
          </div>
          <div className="login-card-header">
              <h1>Sign In</h1>
              <div>Please login to proceed</div>
          </div>
            <div>
              <div className="loginToogle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab} hidden></button>
            </div>
            <form className={`login-card-form ${isLoginHidden ? 'hide' : ''}`} ref={loginTab} onSubmit={loginSubmit}>
              <div className="form-item">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="form-item">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forget Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
    
      
            <form
              className="signUpForm login-card-form "
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div>

              </div>
              <div className="form-item">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="form-item">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="form-item">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input type="submit" value="Register" className="loginBtn" />
            </form>
          </div>
        </div>
      </Fragment>
    
  </Fragment>}
    </Fragment>
  );

}

export default Login