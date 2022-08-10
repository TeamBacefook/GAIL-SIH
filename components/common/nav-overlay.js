import { motion } from "framer-motion";
import { styled } from "@mui/system";

export const Nav = styled(motion.nav)({
  backgroundColor: "rgba(255,255,255,0.8)",
  height: "100vh",
  position: "fixed",
  zIndex: 4,
  display: "flex",
  flexDirection: "column",
  //   justifyContent: "center",
  alignItems: "center",
});

export const Link = styled(motion.ul)({
  color: "#00116A",
  fontSize: "2rem",
});
