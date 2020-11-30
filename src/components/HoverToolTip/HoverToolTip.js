import { Tooltip } from "react-bootstrap";

import React from "react";

function HoverToolTip(props) {
  const text = "Change profile picture";
  return (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );
}

export default HoverToolTip;
