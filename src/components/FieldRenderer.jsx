import React from 'react';

const FieldRenderer = ({ field }) => {
  switch (field.type) {
    case 'text':
      return (
        <div className="mb-2">
          <label className="block mb-2">{field.label}</label>
          <input
            type="text"
            placeholder={`Enter your ${field.label.toLowerCase()} here`}
            className="w-full p-2 border rounded shadow-sm"
          />
        </div>
      );
    case 'email':
      return (
        <div className="mb-2">
          <label className="block mb-2">{field.label}</label>
          <input
            type="email"
            placeholder={`Enter your ${field.label.toLowerCase()} here`}
            className="w-full p-2 border rounded shadow-sm"
          />
        </div>
      );
    case 'radio':
      return (
        <div className="mb-2">
          <label className="block mb-2">{field.label}</label>
          <div className="flex items-center space-x-4">
            {field.options && field.options.map((option, index) => (
              <label key={index} className="flex items-center">
                <input type="radio" name={field.label.toLowerCase()} className="mr-2" />
                {option}
              </label>
            ))}
          </div>
        </div>
      );
    case 'dropdown':
      return (
        <div className="mb-2">
          <label className="block mb-2">{field.label}</label>
          <select className="w-full p-2 border rounded shadow-sm">
            <option value="">Select {field.label}</option>
            {field.options && field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    case 'checkbox':
      return (
        <div className="mb-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            {field.label}
          </label>
        </div>
      );
    case 'image':
      return (
        <div className="mb-2">
          <label className="block mb-2">{field.label}</label>
          <div className="border-2 border-dashed border-gray-300 p-4 text-center">
            <p className="text-gray-500">Drag and drop an image or click to upload</p>
          </div>
        </div>
      );
    default:
      return (
        <div className="mb-2">
          <label className="block mb-2">{field.label}</label>
          <input
            type="text"
            placeholder={`Enter your ${field.label.toLowerCase()} here`}
            className="w-full p-2 border rounded shadow-sm"
          />
        </div>
      );
  }
};

export default FieldRenderer;