import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import withLayout from "../layout";

function MyApp({ Component, pageProps, router }) {
  const theme = createTheme({
    typography: {
      fontFamily: "Reem Kufi",
    },
  });

  return (
    <>
      <div id="top" style={{ position: "absolute", top: 0, left: 0 }} />
      {!router.route.includes("/analytics") ? (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={router.route}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: {
                opacity: 0,
                duration: 5,
              },
              animate: {
                opacity: 1,
                duration: 15,
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
      ) : (
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      )}
    </>
  );
}

export default withLayout(MyApp);
