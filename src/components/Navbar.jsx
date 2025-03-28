import React from "react";
import { AppBar, Box, Toolbar, Button as MuiButton } from "@mui/material";
import { Preview, Save, Publish } from "@mui/icons-material";
import IconButton from "./IconButton";
 
export const Navbar = () => {
  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className="flex justify-end items-center">
          <Box className="flex space-x-4">
            <IconButton text="Preview" color="red-500">
              <Preview size={20} />
            </IconButton>
            <IconButton text="Save" color="green-500">
              <Save size={20} />
            </IconButton>
            <IconButton text="Publish" color="yellow-500">
              <Publish size={20} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
 