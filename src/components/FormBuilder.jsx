import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import FormPreview from './FormPreview';
import SortableFieldList from './SortableFieldList';
import { initialFields, dataFields, customFields } from '../data/fielddata';

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState("Demo Form");
  const [formDescription, setFormDescription] = useState("This is form description");
  const [formPages, setFormPages] = useState([
    [{ id: 'name', type: 'text', label: 'Name' },
    { id: 'email', type: 'email', label: 'Email' }],
  ]);
  // const [formFields, setFormFields] = useState([
  //    { id: 'name-field', type: 'text', label: 'Name' },
  //    { id: 'email-field', type: 'email', label: 'Email' },
  //    { id: 'gender-field', type: 'radio', label: 'Gender', options: ['Male', 'Female'] }
  //  ]);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pendingPageAdd, setPendingPageAdd] = useState(false);

  useEffect(() => {
    if (pendingPageAdd) {
      setCurrentPage(formPages.length - 1);
      setPendingPageAdd(false);
    }
  }, [formPages, pendingPageAdd]);


  const onDrop = (field) => {
    const newField = { ...field };
    // console.log("🔽 Dropped field:", newField); 

    setFormPages((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[currentPage] = [...updatedPages[currentPage], newField];
      // console.log("✅ Updated Pages:", updatedPages); 

      return updatedPages;
    });
  };


  const handleDeleteField = (fieldId) => {
    setFormPages((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[currentPage] = updatedPages[currentPage].filter(field => field.id !== fieldId);
      return updatedPages;
    });
    
  };

  const setFieldsForPage = (updatedFields) => {
    console.log("Updating fields:", updatedFields);

    setFormPages((prevPages) => {
      const newPages = [...prevPages];
      newPages[currentPage] = updatedFields;
      return newPages;
    });

  };

  const addPage = () => {
    setFormPages((prevPages) => [...prevPages, []]);
    setPendingPageAdd(true);
  };

  const removePage = () => {
    if (formPages.length > 1) {
      setFormPages((prevPages) => {
        const newPages = prevPages.filter((_, index) => index !== currentPage);
        return newPages;
      });
      setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
    }
  };

  const nextPage = () => {
    if (currentPage < formPages.length - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };



  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const submittedValues = {};
    formPages.forEach(page => {
      page.forEach(field => {
        submittedValues[field.id] = field.value || "";
      });
    });
  
    console.log("Form submitted with values:", submittedValues);
  };

  const handleFieldsChange = (updatedFields) => {
    // console.log("Updating fields:", updatedFields); // Debugging
    setFieldsForPage(updatedFields);
    setFormPages((prevPages) => {
      const newPages = [...prevPages];
      const currentPageFields = [...newPages[currentPage]];
    
      // Find the field and update its value
      const updatedFields = currentPageFields.map(field => 
        field.id === fieldId ? { ...field, value } : field
      );
      newPages[currentPage] = [...updatedFields];
      return newPages;
    });
  };
  
  // console.log("Passing handleFieldChange to SortableFieldList:", handleFieldsChange);
  const handleFieldValueChange = (fieldId, value) => {
    setFormPages((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[currentPage] = updatedPages[currentPage].map(field => 
        field.id === fieldId ? { ...field, value } : field
      );
      return updatedPages;
    });
  };

 
  return (

        <form onSubmit={handleSubmit} className="flex flex-col min-h-screen bg-white">
          <Header formTitle={formTitle} />

         
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
            {/* console.log("Passing handleFieldChange to FormPreview:", setFieldsForPage); */}

              <FormPreview
                formTitle={formTitle}
                formDescription={formDescription}
                formPages={formPages}
                currentPage={currentPage}
                onDrop={onDrop}
                setFieldsForPage={setFieldsForPage}
                onDelete = {handleDeleteField}
                handleFieldsChange={setFieldsForPage} 
                onFieldValueChange={handleFieldValueChange}  // Add this prop
 
                >

                <SortableFieldList 
                fields={formPages[currentPage] || []} 
                onFieldsChange={setFieldsForPage}  
                // onDelete={(id) => setFields(fields.filter(field => field.id !== id))}
                onDelete={handleDeleteField}
                onFieldValueChange={handleFieldValueChange}  // Add this prop


                />

                </FormPreview>


              <div className="flex justify-between mt-4">

                <button onClick={prevPage} disabled={currentPage === 0} className="px-2 py-1 border-2 border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition">
                  Previous
                </button>

                <div className="flex items-center gap-4">
                  <button onClick={addPage} className="px-2 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
                    Add Page
                  </button>

                  <button onClick={removePage} disabled={formPages.length === 1} className="px-2 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition">
                    Remove Page
                  </button>
                </div>

                <button onClick={nextPage} disabled={currentPage >= formPages.length - 1} className="px-2 py-1 border-2 border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition">
                  Next
                </button>
              </div>
              
              <button
                type="submit"
                // disabled={isSubmitting}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit Form
              </button>

               <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-bold">Form State (Debug):</h3>
                <div>
                  <pre className="text-xs mt-2">{JSON.stringify({formPages}, null, 2)}</pre>
                </div>
              </div>
              
            </main>
          </div>
        
        </form>
      )}
    
  


export default FormBuilder;



