import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import FormPreview from './FormPreview';
import SortableFieldList from './SortableFieldList';
import { initialFields, dataFields } from '../data/fielddata';


const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState("Demo Form");
  const [formDescription, setFormDescription] = useState("This is form description");
  const [formFields, setFormFields] = useState([
    { id: 'name-field', type: 'text', label: 'Name' },
    { id: 'email-field', type: 'email', label: 'Email' },
    { id: 'gender-field', type: 'radio', label: 'Gender', options: ['Male', 'Female'] }
  ]);

  // Handle field drop to form
  const onDrop = (field) => {
    const newField = { ...field, id: `${field.id}-${Date.now()}` };
    setFormFields([...formFields, newField]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header formTitle={formTitle} />
      
      {/* Main content */}
      <div className="flex flex-1 p-6">
        <Sidebar 
          dataFields={dataFields} 
          initialFields={initialFields} 
        />
        
        <FormPreview 
          formTitle={formTitle}
          formDescription={formDescription}
          onDrop={onDrop}
        >
          <SortableFieldList 
            fields={formFields} 
            onFieldsChange={setFormFields} 
          />
        </FormPreview>
      </div>
    </div>
  );
};

export default FormBuilder;


