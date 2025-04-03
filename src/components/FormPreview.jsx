import React from 'react';
import FormHeader from './FormHeader';
import SortableFieldList from './SortableFieldList';
  
const FormPreview = ({ 
  formTitle, 
  formDescription, 
  formPages, 
  currentPage, 
  children,
  onDrop, 
  setFieldsForPage, 
  onDelete
}) => {

  return (
    <div 
      className="flex-1 border rounded-lg"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        try {
          const field = JSON.parse(e.dataTransfer.getData("field"));
          onDrop(field);
        } catch (error) {
          console.error("Error parsing dragged field:", error);
        }
      }}
    >
      <div className="p-6 bg-purple-200 rounded-t-lg flex justify-between items-center">
      <FormHeader />
        <div className="text-red-500 font-bold">incedo</div>
      </div>
      <div>
      
      <h2 className="text-xl font-bold mt-4 text-center" >Page {currentPage + 1}</h2>
</div>
      
      <div className="p-6">
      {/* console.log("Passing onFieldsChange to SortableFieldList:", setFieldsForPage); */}

          <SortableFieldList 
            fields={formPages[currentPage] || []}
            onFieldsChange= {setFieldsForPage}
            // setFields = {setFieldsForPage}
            onDelete={onDelete}            
          />
      </div>
    </div>
  );
};

export default FormPreview;

