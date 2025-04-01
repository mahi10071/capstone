import React from 'react';
import FormHeader from './FormHeader';
import SortableFieldList from './SortableFieldList';

//  const handleDeleteField = (id) => {
//     setFormFields(formFields.filter(field => field.id !== id));
//   };

const FormPreview = ({ formTitle, formDescription, onDrop, children, currentPage, formPages, setFieldsForPage, onDelete }) => {
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
        <form>
          <SortableFieldList 
            fields={formPages[currentPage] || []}
            setFields = {setFieldsForPage}
            // errors={errors}
            // touched={touched}
            onDelete={onDelete}
            // onDelete = {handleDeleteField}
            
          />
          
        </form>
      </div>
    </div>
  );
};

export default FormPreview;

// import React from 'react';
// import FormHeader from './FormHeader';
// import SortableFieldList from './SortableFieldList';


// const FormPreview = ({ formTitle, formDescription, onDrop, children, currentPage, formPages, setFieldsForPage }) => {
//   return (
//     <div 
//       className="flex-1 border rounded-lg"
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={(e) => {
//         e.preventDefault();
//         try {
//           const field = JSON.parse(e.dataTransfer.getData("field"));
//           onDrop(field);
//         } catch (error) {
//           console.error("Error parsing dragged field:", error);
//         }
//       }}
//     >
//       <div className="p-6 bg-purple-200 rounded-t-lg flex justify-between items-center">
//       <FormHeader />
//         <div className="text-red-500 font-bold">incedo</div>
//       </div>
//       <h2 className="text-xl font-bold mt-4">Page {currentPage + 1}</h2>

      
//       <div className="p-6">
//         <form>
//           {children}
//           {/* <SortableFieldList 
//             fields={formPages[currentPage] || []} 
//             setFields={setFieldsForPage} 
//             onRemoveField={removeField} 
//           /> */}
//           {/* <SortableFieldList 
//             fields={formPages[currentPage] || []} 
//             setFields={setFieldsForPage} 
//             // onRemoveField={removeField}
//             onFieldsChange={setFormFields}
//             errors={errors}
//             touched={touched} 
//           />  */}
          
//           {/* Submit button */}
//           {/* <button type="submit" className="bg-purple-400 text-black px-6 py-2 rounded mt-4 w-full">
//             Submit
//           </button> */}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FormPreview;

// // import React from 'react';
// // import SortableFieldList from './SortableFieldList';

// // const FormPreview = ({ formTitle, formDescription, onDrop, children, currentPage, formPages, removeField, setFieldsForPage }) => {
// //   return (
// //     <div 
// //       className="flex-1 border rounded-lg"
// //       onDragOver={(e) => e.preventDefault()}
// //       onDrop={(e) => {
// //         e.preventDefault();
// //         try {
// //           const field = JSON.parse(e.dataTransfer.getData("field"));
// //           onDrop(field);
// //         } catch (error) {
// //           console.error("Error parsing dragged field:", error);
// //         }
// //       }}
// //     >
      
// //       <div className="p-6 bg-purple-200 rounded-t-lg flex justify-between items-center">
// //         <div>
// //           <h2 className="text-xl font-bold">{formTitle}</h2>
// //           <p>{formDescription}</p>
// //         </div>
// //         <div className="text-red-500 font-bold">incedo</div>
// //       </div>
// //       <h2 className="text-xl font-bold mt-4">Page {currentPage + 1}</h2>
      
// //       <div className="p-6">
// //         <form>
// //         <SortableFieldList 
// //             fields={formPages[currentPage] || []} 
// //             setFields={setFieldsForPage} 
           
// //           />
          
          
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FormPreview;


