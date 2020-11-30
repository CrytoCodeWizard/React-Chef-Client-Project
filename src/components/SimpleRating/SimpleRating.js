import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./SimpleRating.css";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

export default function SimpleRating({ reviewScore }) {
  const value = reviewScore;
  const hover = -1;

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <div className="rating-box">
          <Rating name="read-only" value={value} readOnly />
          <Typography component="legend">
            {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
          </Typography>
        </div>
      </Box>
    </div>
  );
}
