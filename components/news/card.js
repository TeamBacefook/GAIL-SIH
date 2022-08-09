import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import placeholder from "../../images/placeholder.svg";
import { Box } from "@mui/system";
export default function MediaCard() {
  return (
    <Card
      sx={{
        px: 3,
        py: 1,

        background: "transparent",
        boxShadow: "none",
        border: "1px solid #FF5C00",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "40%",
            },
          }}
        >
          <Image src={placeholder} layout="responsive" alt="" />
        </Box>{" "}
        <CardContent>
          <Typography
            fontSize={25}
            color="#003973"
            gutterBottom
            variant="h5"
            component="div"
          >
            "Sedutperspiciatisunde
          </Typography>
          <Typography fontSize={20} color="#003973">
            "But I must explain to you how all this mistaken idea of denouncing
            "But I must explain to youLorem Ipsum has been the industry's
            standard More...
          </Typography>
        </CardContent>
      </Box>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "60%",
            background:
              "linear-gradient(169.84deg, #FFE53B -30.77%, #FF2525 119.39%)",
            color: "white",
            borderRadius: "11px",
            textTransform: "none",
          }}
        >
          Explore More
        </Button>
      </CardActions>
    </Card>
  );
}
