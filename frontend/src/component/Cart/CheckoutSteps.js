import React, { Fragment } from "react";
import "./CheckoutSteps.css";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";


/**/
/*
CheckoutSteps()
NAME
    CheckoutSteps
SYNOPSIS
    CheckoutSteps({ activeStep });
    activeStep -> prop that indicates the current step of the checkout process, and based on that it highlights the current step
    as active and any previous steps as completed.
DESCRIPTION
    This component is used to display the checkout steps in a horizontal stepper format. 
    It uses the Material-UI Stepper component to display the steps, and each step is rendered as a Step component that includes a StepLabel 
    with the label and icon for the step.
RETURNS
    Returns a JSX element that displays the checkout steps in a horizontal stepper format, with the current step highlighted as active and any previous steps as completed.
*/
/**/
const CheckoutSteps = ({ activeStep }) => {
  // Define an array of steps for the checkout process
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  // Define the style for the steps
  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      {/* Display the Stepper component */}
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        
        {/* Map through the steps array and render each step */}
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "blue" : "rgba(0, 0, 0, 0.6)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};
/* CheckoutSteps({ activeStep }); */

export default CheckoutSteps;
