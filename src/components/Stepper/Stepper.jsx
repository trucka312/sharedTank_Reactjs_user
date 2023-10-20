import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StepperStyle = styled.div`
  width: 70%;
  margin: 40px auto 20px;  
  .stepper-wrapper-horizontal {
    display: flex;
    justify-content: space-between;

    .step-wrapper {
      width: 23%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .step-number {
      border-radius: 50%;
      width: 20px;
      height: 20px;
      padding: 3px;
      text-align: center;
      margin-bottom: 1.2rem;
    }

    .divider-line {
      height: 1px;
      background-color: #bdbdbd;
      position: absolute;
      top: 20%;
      left: 70%;
    }

    .divider-line-2 {
      width: 296%;
    }

    .divider-line-3 {
      width: 125%;
    }

    .divider-line-4 {
      width: 70%;
    }

    .divider-line-5 {
      width: 60%;
    }
  }

  .step-number-selected {
    border: 1px solid #bdbdbd;
    color: #fff;
  }

  .step-number-disabled {
    // border: 1px solid #838383;
    background-color: #d9d9d9;
    color: #fff;
  }

  .step-description-active {
    font-weight: bold;
  }
`;

const Stepper = ({ stepColor, steps, direction, currentStep }) => {
  const [stepState, setStepState] = useState([]);

  useEffect(() => {
    let createSteps = steps.map((step, idx) => ({
      description: step.label,
      component: step.component,
      completed: idx < currentStep - 1,
      selected: idx <= currentStep - 1,
      highlighted: idx === currentStep - 1,
    }));

    setStepState(createSteps);
  }, [steps, currentStep]);

  return (
    <StepperStyle>
      <div className={`stepper-wrapper-${direction}`}>
        {stepState.map(
          (
            { selected, completed, highlighted, description, component },
            idx
          ) => (
            <div className="step-wrapper" key={idx}>
              <div
                className={`step-number step-number-${
                  selected ? "active" : "disabled"
                }`}
                style={{
                  background: `${selected ? stepColor : "#d9d9d9"}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                {completed ? "✔" : idx + 1}
              </div>
              <div
                className={`step-description ${
                  highlighted ? "step-description-active" : ""
                }`}
              >
                {description}
              </div>
              {idx + 1 !== stepState.length && (
                <div
                  className={`divider-line divider-line-${stepState.length}`}
                />
              )}
              <div>{component}</div>
            </div>
          )
        )}
      </div>
    </StepperStyle>
  );
};

Stepper.propTypes = {
  direction: PropTypes.string.isRequired,
  steps: PropTypes.array.isRequired,
};

export default Stepper;
