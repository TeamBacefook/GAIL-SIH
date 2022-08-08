import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import withLayout from "../layout";
import Aos from "aos";
import "aos/dist/aos.css";
function MyApp({ Component, pageProps, router }) {
  const theme = createTheme({
    typography: {
      fontFamily: "Reem Kufi",
    },
  });

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    Aos.refresh();
  }, [router.pathname]);

  return (
    <>
      <AnimatePresence>
        <motion.div
          key={router.route}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
              duration: 10,
            },
            exit: {
              opacity: 0,
              duration: 3,
            },
          }}
        >
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </StyledEngineProvider>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default withLayout(MyApp);
