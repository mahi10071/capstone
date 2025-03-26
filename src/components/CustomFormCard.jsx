import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import FormDetailDialog from "./FormDetailDialog";
 
const CustomFormCard = () => {
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => {
    setOpen(true);
  };
 
  return (
    <div>
      <Card
        onClick={handleOpen}
        className="flex flex-col sm:flex-row justify-between shadow-lg transition-transform duration-300 transform hover:cursor-pointer hover:scale-105 hover:shadow-xl border-2"
        sx={{
          "&:hover": {
            borderColor: "#6ec1b3",
            boxShadow: `0 4px 10px rgba(0, 0, 0, 0.1), 0 0 15px #87CEEB`,
          },
        }}
      >
        <Box className="flex justify-center items-center ml-4 ">
          <LibraryAddIcon sx={{ color: "#87CEEB", fontSize: 70 }} />
        </Box>
        <CardContent>
          <Typography
            variant="h5"
            color="text.primary"
            className="text-gray-800 mb-4"
          >
            Create from Scratch
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-gray-600 mb-6"
          >
            Want to build a custom form? Start from scratch and tailor it to
            your needs.
          </Typography>
        </CardContent>
      </Card>
 
      <FormDetailDialog open={open} setOpen={setOpen} />
    </div>
  );
};
 
export default CustomFormCard;