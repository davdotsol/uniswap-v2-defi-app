import React from "react";
import classes from "./WalletInfo.module.css";

const WalletInfo = (props) => {
  return (
    <div className={classes["wallet-info"]}>
      <div className={classes["balance"]}>
        <div className={classes["balance__label"]}>ETH</div>
        <div className={classes["balance__amount"]}>{props.ethBalance}</div>
      </div>

      <div className={classes["balance"]}>
        <div className={classes["balance__label"]}>USDC</div>
        <div className={classes["balance__amount"]}>{props.tokenBalance}</div>
      </div>
    </div>
  );
};

export default WalletInfo;
