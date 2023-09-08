import React from "react";
import clsx from "clsx";
import { Button } from "@mui/material";
import "./clxs.css";
const isSuccess = true;
const isError = false;
// const buttonStyle = clsx({
//   success: isSuccess,
//   error: isError,
// });
const Clsx = () => {
  return (
    <div>
      <Button
        variant={
          clsx({
            outlined: !isSuccess,
            contained: !isError,
          }) as "outlined" | "contained"
        }
      >
        Hello
      </Button>
    </div>
  );
};

export default Clsx;
