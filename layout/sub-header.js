import React from "react";
import SubHeader from "../components/analytics/sub-header";

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <SubHeader />
      </nav>
      {children}
    </div>
  );
};

const withSubheader = (Component) => (props) => {
  return (
    <>
      <Layout>
        <Component {...props} />
      </Layout>
    </>
  );
};

export default withSubheader;
