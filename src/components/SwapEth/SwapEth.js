import React from "react";

import Card from "../UI/Card/Card";
import classes from "./SwapEth.module.css";
import Button from "../UI/Button/Button";

const SwapEth = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    props.onSwap();
  };

  const onEthEntered = (event) => {
    const value = event.target.value;
    props.onEthEntered(value);
  };

  return (
    <Card className={classes.swap}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <input type="number" step=".1" onChange={onEthEntered} />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Swap ETH
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SwapEth;
