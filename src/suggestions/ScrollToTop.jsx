import React from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = ({ location }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default withRouter(ScrollToTop);
