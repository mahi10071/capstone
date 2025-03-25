import React, { useState } from 'react';

const Sidebar = ({ dataFields, initialFields }) => {
  const [activeTab, setActiveTab] = useState('inputTypes');
  const [dataExpanded, setDataExpanded] = useState(true);
  const [fieldsExpanded, setFieldsExpanded] = useState(true);

  return (
    <div className="w-100 border rounded-lg mr-9">
      {/* Data Section */}
      <div className="border-b">
        <div 
          className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
          onClick={() => setDataExpanded(!dataExpanded)}
        >
          <h3>Data Section</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transform ${dataExpanded ? 'rotate-0' : 'rotate-180'}`}
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
        {dataExpanded && (
          <div className="p-4 grid grid-cols-2 gap-2">
            {dataFields.map((field) => (
              <button 
                key={field.id} 
                className="border rounded p-2 text-sm text-center cursor-pointer hover:bg-gray-50"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("field", JSON.stringify(field))}
              >
                {field.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Fields */}
      <div>
        <div 
          className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
          onClick={() => setFieldsExpanded(!fieldsExpanded)}
        >
          <h3>Fields</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transform ${fieldsExpanded ? 'rotate-0' : 'rotate-180'}`}
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
        
        {fieldsExpanded && (
          <>
            {/* Tabs */}
            <div className="flex border-b">
              <button 
                className={`flex-1 py-2 text-sm ${activeTab === 'inputTypes' ? 'border-b-2 border-black' : ''}`}
                onClick={() => setActiveTab('inputTypes')}
              >
                Input Types
              </button>
              <button 
                className={`flex-1 py-2 text-sm ${activeTab === 'customFields' ? 'border-b-2 border-black' : ''}`}
                onClick={() => setActiveTab('customFields')}
              >
                Custom Fields
              </button>
            </div>
            
            {/* Field buttons */}
            <div className="p-4 grid grid-cols-2 gap-2">
              {initialFields.map((field) => (
                <button 
                  key={field.id} 
                  className="border rounded p-2 text-sm text-center cursor-pointer hover:bg-gray-50"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("field", JSON.stringify(field))}
                >
                  {field.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;