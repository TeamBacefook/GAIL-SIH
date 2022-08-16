import React from "react";
import Header from "../components/common/header";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <Header />
      </nav>
      {children}
    </>
  );
};

const withLayout = (Component) => (props) => {
  return (
    <>
      <Layout>
        <Component {...props} />
      </Layout>
    </>
  );
};

export default withLayout;
