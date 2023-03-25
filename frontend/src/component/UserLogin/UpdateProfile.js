import React, { useState, useEffect } from "react";
import "./Login.css";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import logos from "../UserLogin/logoa.jpeg";
import { clearErrors, updateProfile, loadUser } from "../../actions/UserAction";
import FaceIcon from "@material-ui/icons/Face";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import TopHeading from "../TopHeading";


/**/
/*
UpdateProfile
NAME
    UpdateProfile
SYNOPSIS
    UpdateProfile()
DESCRIPTION
    This function renders a form to allow the user to update their profile
RETURNS
    jsx that renders form to update profile.
*/
/**/
const UpdateProfile = () => {
  // Import necessary dependencies
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  // Use the useSelector hook to get necessary details from the store
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  // Set initial states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

  // Function to handle form submission
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar || "");
    dispatch(updateProfile(myForm));
  };

  // Function to handle changes to the avatar image
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Effect hook to update the component state when user info changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile update success");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [alert, dispatch, error, isUpdated, navigate, user]);

  return (
    <div>
      {loading ? (
        // Display loading screen when data is being fetched
        <LoadingScreen />
      ) : (
        <div>
          {/* Display a heading */}
          <TopHeading title="UPDATE PROFILE" />

          <div className="top login-card-container">
            <div className="login-card">
              <div className="login-card-logo">
                <img src={logos} alt="logo" />
              </div>
              <div className="login-card-header">
                <h1>Update Profile</h1>
              </div>

              {/* Display a form for updating the user's profile */}
              <form
                className="updateform login-card-form shiftToNeutralForm "
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div></div>
                <div className="form-item">
                  <FaceIcon />

                  {/* name */}
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* email */}
                <div className="form-item">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* image */}
                <div id="registerImage">
                  <img
                    className="updateimg"
                    src={avatarPreview}
                    alt="Avatar Preview"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>

                {/* Submit button for updating the profile */}
                <input
                  type="submit"
                  value="Update profile"
                  className="loginBtn"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* UpdateProfile */
export default UpdateProfile;
