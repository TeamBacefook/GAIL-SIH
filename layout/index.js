import React from "react";
import Header from "../components/common/header";

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <Header />
      </nav>
      {children}
    </div>
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
