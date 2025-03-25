import React from 'react';

const FormPreview = ({ formTitle, formDescription, onDrop, children }) => {
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
        <div>
          <h2 className="text-xl font-bold">{formTitle}</h2>
          <p>{formDescription}</p>
        </div>
        <div className="text-red-500 font-bold">incedo</div>
      </div>
      
      <div className="p-6">
        <form>
          {children}
          
          {/* Submit button */}
          <button type="submit" className="bg-purple-400 text-black px-6 py-2 rounded mt-4 w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPreview;
