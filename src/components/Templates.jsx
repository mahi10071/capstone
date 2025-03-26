import React from "react";
import { templates } from "../data/templates";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CustomFormCard from "./CustomFormCard";
 
const Templates = () => {
  return (
    <div>
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {templates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card
              key={template.id}
              className="flex flex-col sm:flex-row justify-between shadow-lg transition-transform duration-300 transform hover:cursor-pointer hover:scale-105 hover:shadow-xl border-2"
              sx={{
                "&:hover": {
                  borderColor: template.iconColor,
                  boxShadow: `0 4px 10px rgba(0, 0, 0, 0.1), 0 0 15px ${template.iconColor}`,
                },
              }}
            >
              <Box className="flex justify-center items-center ml-4 ">
                <IconComponent
                  sx={{
                    color: template.iconColor,
                    fontSize: template.iconSize,
                  }}
                />
              </Box>
 
              <Box className="sm:w-2/3 sm:ml-6 flex flex-col justify-between">
                <CardContent>
                  <Typography
                    variant="h5"
                    color="text.primary"
                    className="text-gray-800 font-semibold"
                  >
                    {template.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-gray-600"
                  >
                    {template.description}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          );
        })}
        <CustomFormCard />
      </Box>
    </div>
  );
};
 
export default Templates;
 
 