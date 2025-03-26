import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import Templates from "./Templates";
 
export const Forms = () => {
 
  return (
    <Box className="p-6 bg-gray-50 min-h-screen">
      <Typography
        variant="h4"
        align="center"
        color="text.primary"
        className="text-gray-800 mb-4"
      >
        Create a New Form
      </Typography>
 
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        className="text-gray-600 mb-8"
      >
        Get started with a form template or create a custom form to fit your
        exact needs.
      </Typography>
 
     <Templates />
     </Box>
  );
};