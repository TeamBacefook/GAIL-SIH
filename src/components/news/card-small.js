import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import placeholder from "../../images/placeholder.svg";
import { Box } from "@mui/system";
export default function MediaCard({ data }) {
  return (
    <Card
      sx={{
        px: 2,
        py: 3,

        background: "transparent",
        boxShadow: "none",
        border: "1px solid #FF5C00",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
      <CardContent>
        <Typography
          fontSize={25}
          color="#003973"
          gutterBottom
          variant="h5"
          component="div"
        >
          {data.Headline}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => window.open(data.URL)}
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
