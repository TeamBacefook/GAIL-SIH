import { styled } from "@mui/system";
import { Slider } from "@mui/material";

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: "red",
  height: 3,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    opacity: 0,
    backgroundColor: "#fff",
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,

    color: "#FF5C00",
  },

  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "#00116A",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#00116A",
    height: 15,
    width: 15,
    borderRadius: "50%",
    "&.MuiSlider-markActive": {
      opacity: 1,
      height: 18,
      width: 18,
      backgroundColor: "#FF5C00",
    },
  },
}));

export default IOSSlider;
