import React from "react";

import Card from "../UI/Card/Card";
import classes from "./SwapUSDC.module.css";
import Button from "../UI/Button/Button";

const SwapUSDC = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    props.onSwap();
  };

  const onTokenEntered = (event) => {
    const value = event.target.value;
    props.onTokenEntered(value);
  };

  return (
    <Card className={classes.swap}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <input type="number" step=".1" onChange={onTokenEntered} />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Swap USDC
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SwapUSDC;
