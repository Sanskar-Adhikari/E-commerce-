import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import TopHeading from "../TopHeading";


/**/
/*
Shipping()
NAME
    Shipping
SYNOPSIS
    Shipping();
DESCRIPTION
    This component displays a form for the user to enter their shipping information, including their
    address, city, state, country, pin code, and phone number. The component uses Redux to store
    the shipping information, and it dispatches an action to save the information to the store when the
    form is submitted. 
RETURNS
    This component returns a JSX element that displays a form for entering shipping information.
*/
/**/
const Shipping = () => {
  // Import necessary hooks and selectors
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  // Set up state for each shipping information field
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  // Function called when the shipping form is submitted
  const shippingSubmit = (e) => {
    e.preventDefault();

    // Perform validation on the phone number field
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be exactly 10 digits");
      return;
    }

    // Dispatch an action to save the shipping info to the Redux store
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    // Navigate to the order confirmation page
    navigate("/order/confirm");
  };

  return (
    <Fragment>

      {/* TopHeading component */}
      <TopHeading title='SHIPPING INFO'/>
      
      {/* Render the checkout step component and pass the active step as a prop */}
      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >

            {/* Render input fields for each shipping information field and set up state and onChange events */}
            <div>
              {/* Address*/}
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              {/* City*/}
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              {/* zip code*/}
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              {/* phone number*/}
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              {/* Country */}
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Render a select element for the state field if a country has been selected  */}
            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Render the submit button and disable it until a state has been selected */}
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

/* Shipping(); */
export default Shipping;
