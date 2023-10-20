import { useParams } from "react-router-dom";

import Recharge from "./ReCharge";
import React from "react";
import WithDraw from "./WithDraw";

export default function Transaction() {
  const { action } = useParams();
  return (
    <React.Fragment>
      {action === "withdraw-money" ? <WithDraw></WithDraw> : <Recharge></Recharge>}
    </React.Fragment>
  );
}
