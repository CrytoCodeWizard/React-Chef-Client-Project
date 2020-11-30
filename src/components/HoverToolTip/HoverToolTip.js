import { Tooltip } from "react-bootstrap";

import React from "react";

function HoverToolTip(props) {
  const { text } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );
}

export default HoverToolTip;
