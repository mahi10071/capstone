import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import Header from './Header';
import Sidebar from './Sidebar';
import FormPreview from './FormPreview';
import SortableFieldList from './SortableFieldList';
import { initialFields, dataFields, customFields } from '../data/fielddata';
import { validationSchema, initialValues } from '../validations/formvalidation'; // Import the validation schema


const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState("Demo Form");
  const [formDescription, setFormDescription] = useState("This is form description");
  const [formFields, setFormFields] = useState([
    { id: 'name-field', type: 'text', label: 'Name' },
    { id: 'email-field', type: 'email', label: 'Email' },
    { id: 'gender-field', type: 'radio', label: 'Gender', options: ['Male', 'Female'] }
  ]);
  const [formPages, setFormPages] = useState([
    [{ id: 'name-field', type: 'text', label: 'Name' },
    { id: 'email-field', type: 'email', label: 'Email' }],
  ]);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pendingPageAdd, setPendingPageAdd] = useState(false);

  // useEffect(() => {

  //   if (pendingPageAdd ) {
  //     setCurrentPage(formPages.length - 1);
  //     setPendingPageAdd(false);
  //   }
  // }, [formPages, pendingPageAdd]);

  useEffect(() => {
    console.log("Current Page Updated:", currentPage);
  }, [currentPage]);
  




  // Handle field drop to form
  const onDrop = (field) => {
    const newField = { ...field, id: `${field.id}-${Date.now()}` };
    // setFormFields([...formFields, newField]);
    setFormPages((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[currentPage] = [...updatedPages[currentPage], newField];
      return updatedPages;
    });
  };

  // const removeField = (fieldId) => {
  //   setFormPages((prevPages) => {
  //     const updatedPages = [...prevPages];
  //     updatedPages[currentPage] = updatedPages[currentPage].filter(field => field.id !== fieldId);
  //     return updatedPages;
  //   });
  // };

  const setFieldsForPage = (updatedFields) => {
    setFormPages((prevPages) => {
      const newPages = [...prevPages];
      newPages[currentPage] = updatedFields;
      return newPages;
    });
  };

  // const addPage = () => {
  //   console.log("Before adding page - formPages:", formPages, "currentPage:", currentPage);
  // setFormPages((prevPages) => {
  //   const newPages = [...prevPages, []];
  //   console.log("After adding page - newPages:", newPages);
  //   return newPages;
  // });
  // setPendingPageAdd(true);
  // };

  const addPage = () => {
  
    setFormPages((prevPages) => {
      const newPages = [...prevPages, []]; // Add a new empty page
      console.log("After adding page:", newPages);
      return newPages;
    });
  
    setPendingPageAdd(true); // Ensure the effect triggers
  };
  
  

  // const removePage = () => {
  //   if (formPages.length > 1) {
  //     setFormPages((prevPages) => {
  //       const newPages = prevPages.filter((_, index) => index !== currentPage);
  //       return newPages;
  //     });
  //     setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  //   }
  // };

  const removePage = () => {
    if (formPages.length > 1) {
      setFormPages((prevPages) => {
        const newPages = prevPages.filter((_, index) => index !== currentPage);
        return newPages;
      });
  
      setCurrentPage((prev) => Math.max(0, prev - 1));
    }
  };
  

  // const nextPage = () => {
  //   if (currentPage < formPages.length - 1) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   }
  // };
  const nextPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev + 1, formPages.length - 1);
      console.log("Current Page Before:", prev, "Attempting to move to:", newPage, "Total Pages:", formPages.length);
      return newPage;
    });
  };
  
  

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      // Process form submission
      console.log('Form submitted', values);
      // Add your submission logic here
    } catch (error) {
      console.error('Submission error', error);
    } finally {
      setSubmitting(false);
    }
    };
   
  return (
    
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      

{({ isSubmitting, values, errors, touched }) => (

    <div className="flex flex-col min-h-screen bg-white">
      <Header formTitle={formTitle} />
      
      {/* Main content */}
      <div className="flex flex-1 p-5">
      <div className="w-1/4 pr-4">
        <Sidebar
          onDrop={onDrop} 
          dataFields={dataFields} 
          initialFields={initialFields} 
          customFields={customFields}
        />
        </div>
              
        <main className="w-3/4">
        <FormPreview 
          formTitle={formTitle}
          formDescription={formDescription}
          formPages={formPages} 
          currentPage={currentPage}
          //  setFormPages={setFormPages}
          onDrop={onDrop}
          // onRemoveField={removeField}
          setFieldsForPage={setFieldsForPage}

        >

          console.log("Rendering FormPreview - Current Page:", currentPage);

          <h2 className="text-xl font-bold mb-2">Page {currentPage + 1}</h2>

          <SortableFieldList 
            fields={formPages[currentPage] || []} 
            setFields={setFieldsForPage} 
            // onRemoveField={removeField}
            onFieldsChange={setFormFields}
            errors={errors}
            touched={touched} 
          />

            <div className="flex justify-between mt-4">
              <button onClick={prevPage} disabled={currentPage === 0} className="px-4 py-2 bg-gray-300 rounded">Previous</button>
              <button onClick={addPage} className="px-4 py-2 bg-blue-500 text-white rounded">Add Page</button>
              <button onClick={removePage} disabled={formPages.length === 1} className="px-4 py-2 bg-red-500 text-white rounded">Remove Page</button>
              <button onClick={nextPage} disabled={currentPage >= formPages.length - 1} className="px-4 py-2 bg-gray-300 rounded">Next</button>
            </div>


        </FormPreview>
        <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Form'}
              </button>
            </main>
      </div>
    </div>
    )}
    </Formik>
  );
};

export default FormBuilder;
// import React, { useState, useEffect } from 'react';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import FormPreview from './FormPreview';
// import SortableFieldList from './SortableFieldList';
// import { initialFields, dataFields } from '../data/fielddata';

// const FormBuilder = () => {
//   const [formTitle, setFormTitle] = useState("Demo Form");
//   const [formDescription, setFormDescription] = useState("This is form description");
//   const [formPages, setFormPages] = useState([
//     [{ id: 'name-field', type: 'text', label: 'Name' },
//      { id: 'email-field', type: 'email', label: 'Email' }],
//   ]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pendingPageAdd, setPendingPageAdd] = useState(false);

//   useEffect(() => {
//     if (pendingPageAdd) {
//       setCurrentPage(formPages.length - 1);
//       setPendingPageAdd(false);
//     }
//   }, [formPages, pendingPageAdd]);

//   const onDrop = (field) => {
//     const newField = { ...field, id: `${field.id}-${Date.now()}` };
//     setFormPages((prevPages) => {
//       const updatedPages = [...prevPages];
//       updatedPages[currentPage] = [...updatedPages[currentPage], newField];
//       return updatedPages;
//     });
//   };

//   const setFieldsForPage = (updatedFields) => {
//     setFormPages((prevPages) => {
//       const newPages = [...prevPages];
//       newPages[currentPage] = updatedFields;
//       return newPages;
//     });
//   };

//   const addPage = () => {
//     setFormPages((prevPages) => [...prevPages, []]);
//     setPendingPageAdd(true);
//   };

//   const removePage = () => {
//     if (formPages.length > 1) {
//       setFormPages((prevPages) => {
//         const newPages = prevPages.filter((_, index) => index !== currentPage);
//         return newPages;
//       });
//       setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
//     }
//   };

//   const nextPage = () => {
//     if (currentPage < formPages.length - 1) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <Header formTitle={formTitle} />
//       <div className="flex flex-grow">
//         <Sidebar onDrop={onDrop} dataFields={dataFields} initialFields={initialFields} />
//         <main className="flex flex-col flex-grow p-4">
//           <FormPreview 
//             formPages={formPages}
//             currentPage={currentPage}
//             formTitle={formTitle}
//             formDescription={formDescription}
//             onDrop={onDrop} 
            
//             setFieldsForPage={setFieldsForPage}
//           />
          
//           <div className="flex justify-between mt-4">
//             <button onClick={prevPage} disabled={currentPage === 0} className="px-2 py-1 border-2 border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition">Previous</button>
//             <button 
//               onClick={addPage} 
//               className="px-2 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
//             >Add Page</button>
//             <button 
//               onClick={removePage} 
//               disabled={formPages.length === 1} 
//               className="px-2 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
//             >Remove Page</button>
//             <button onClick={nextPage} disabled={currentPage >= formPages.length - 1} className="px-2 py-1 border-2 border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition">Next</button>
//           </div>
//          {/* </FormPreview> */}
//          {/* Submit button */}
//          <button type="submit" className="bg-purple-400 text-black px-6 py-2 rounded mt-4 w-full">
//             Submit
//           </button>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;