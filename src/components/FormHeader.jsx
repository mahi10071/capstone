import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
 
const FormHeader = () => {
  const location = useLocation();
  const { title: initialFormName, description: initialDescription } =
    location.state || {};
  const [title, setFormName] = useState(initialFormName || "Default Form");
  const [description, setDescription] = useState(
    initialDescription || "This is the default description."
  );
 
  console.log(title);
  console.log(description);
 
  const [isEditingFormName, setIsEditingFormName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
 
  const handleSaveFormName = (event) => {
    setFormName(event.target.value);
    setIsEditingFormName(false);
  };
 
  const handleSaveDescription = (event) => {
    setDescription(event.target.value);
    setIsEditingDescription(false);
  };
  return (
    <>
      <Box className="flex flex-col items-center space-x-4">
        <Typography variant="h5" className=" font-semibold">
          {!isEditingFormName ? (
            <span
              className="cursor-pointer"
              onClick={() => setIsEditingFormName(true)}
            >
              {title}
            </span>
          ) : (
            <TextField
              autoFocus
              value={title}
              onBlur={handleSaveFormName}
              onChange={(e) => setFormName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveFormName(e);
              }}
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        </Typography>
 
        <Typography variant="body1" className="">
          {!isEditingDescription ? (
            <span
              className="cursor-pointer"
              onClick={() => setIsEditingDescription(true)}
            >
              {description}
            </span>
          ) : (
            <TextField
              autoFocus
              value={description}
              onBlur={handleSaveDescription}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveDescription(e);
              }}
              size="small"
              fullWidth
            />
          )}
        </Typography>
      </Box>
    </>
  );
};
 
export default FormHeader;