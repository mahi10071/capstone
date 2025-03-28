// data/fieldData.js
export const initialFields = [
    { id: 'name', type: 'text', label: 'Name' },
    { id: 'email', type: 'email', label: 'Email' },
    { id: 'phone', type: 'text', label: 'Phone' },
    { id: 'radio', type: 'radio', label: 'Radio', options: ['Option 1', 'Option 2'] },
    { id: 'dropdown', type: 'dropdown', label: 'Dropdown', options: ['Option 1', 'Option 2', 'Option 3'] },
    { id: 'checkbox', type: 'checkbox', label: 'Checkbox' }
  ];
  
  export const dataFields = [
    { id: 'company-logo', type: 'image', label: 'Company Logo' },
    { id: 'image-footer', type: 'image', label: 'Image Footer' },
    { id: 'image-header', type: 'image', label: 'Image Header' }
  ];
  
  export const customFields = [
    // Text Input Field
    { id: 'text', type: 'text', label: 'Text Input' },
 
    // Number Input Field
    { id: 'number', type: 'number', label: 'Number Input' },
 
    // Textarea Field
    { id: 'textarea', type: 'textarea', label: 'Textarea' },
 
    // Checkbox Field (Single checkbox)
    { id: 'checkbox', type: 'checkbox', label: 'Checkbox' },
 
    // Multiple Checkboxes (if you want a group of checkboxes)
    { id: 'checkboxes', type: 'checkbox', label: 'Checkboxes', options: ['Option 1', 'Option 2', 'Option 3'] },
 
    // Radio Button Field
    { id: 'radio', type: 'radio', label: 'Radio Button', options: ['Option 1', 'Option 2'] },
 
    // Dropdown (Select list)
    { id: 'dropdown', type: 'dropdown', label: 'Dropdown', options: ['Option 1', 'Option 2', 'Option 3'] },
 
    // Date Input Field
    { id: 'date', type: 'date', label: 'Date Input' },
 
    // File Upload Field
    { id: 'file', type: 'file', label: 'File Upload' }
  ];
 