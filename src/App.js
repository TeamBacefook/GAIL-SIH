import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home New copy";
import About from "./Pages/About";
import Global from "./Pages/analytics/global";
import { createTheme, ThemeProvider } from "@mui/material";
import Continental from "./Pages/analytics/continental";
import India from "./Pages/analytics/india";
import { ToastContainer } from "react-toastify";
import Predictions from "./Pages/predictions";
import "react-toastify/dist/ReactToastify.css";
import News from "./Pages/news";
import Team from "./Pages/team";

import "./App.css";

function useScrollToTop({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return children;  
}

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Reem Kufi",
    },
  });
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        dragable={false}
        pauseOnHover={false}
      />
      <ThemeProvider theme={theme}>
        <Router>
          <useScrollToTop>
            <Routes>
              {/* <Route exact path="/" element={<Home />} /> */}
              <Route exact path="/about" element={<About />} />
              <Route exact path="/analytics/global" element={<Global />} />
              <Route exact path="/analytics/india" element={<India />} />
              <Route exact path="/" element={<Predictions />} />
              <Route
                exact
                path="/analytics/continental"
                element={<Continental />}
              />

              <Route path="/news" element={<News />} />
              <Route path="/team" element={<Team />} />

              {/* <Route path="*" /> */}
            </Routes>
          </useScrollToTop>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
