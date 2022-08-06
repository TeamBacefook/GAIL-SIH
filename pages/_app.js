import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    typography: {
      fontFamily: "Reem Kufi",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
