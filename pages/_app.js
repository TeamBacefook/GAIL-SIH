import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import "../styles/globals.css";
import AOS from "aos";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import withLayout from "../layout";

// function Loading() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const handleStart = (url) => url !== router.asPath && setLoading(true);
//     const handleComplete = (url) =>
//       url === router.asPath &&
//       setTimeout(() => {
//         setLoading(false);
//       }, 5000);

//     router.events.on("routeChangeStart", handleStart);
//     router.events.on("routeChangeComplete", handleComplete);
//     router.events.on("routeChangeError", handleComplete);

//     return () => {
//       router.events.off("routeChangeStart", handleStart);
//       router.events.off("routeChangeComplete", handleComplete);
//       router.events.off("routeChangeError", handleComplete);
//     };
//   });

//   return (
//     loading && (
//       <motion.div
//         key={router.route}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         style={{ backgroundColor: "blue", height: "100vh" }}
//         variants={{
//           initial: {
//             opacity: 0,
//           },
//           animate: {
//             opacity: 1,
//             duration: 5,
//           },
//           exit: {
//             opacity: 0,
//           },
//         }}
//       ></motion.div>
//     )
//   );
// }

function MyApp({ Component, pageProps, router }) {
  const theme = createTheme({
    typography: {
      fontFamily: "Reem Kufi",
    },
  });
  useEffect(() => {
    AOS.init();
  }, []);
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
          {/* <Loading /> */}
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
