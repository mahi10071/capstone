
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FieldRenderer from './FieldRenderer';
 
const DraggableField = ({ field, onLabelChange, onDelete }) => {
  
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '1rem',
  };
 
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(field.label);
  const [isRequired, setIsRequired] = useState(field.required || false);
 
  const handleLabelChange = (e) => setLabel(e.target.value);
 
  const saveLabel = () => {
    setIsEditing(false);
    onLabelChange(field.id, label);
  };
 
  const toggleRequired = () => {
    const updatedRequired = !isRequired;
    setIsRequired(updatedRequired);
    if (typeof onUpdateField === 'function') {
    onUpdateField(field.id, { ...field, required: updatedRequired });
  } else {
    // If onUpdateField doesn't exist, use onLabelChange as a fallback
    // or add the onUpdateField prop to this component
    onLabelChange(field.id, label, updatedRequired);
  }
};

const handleFieldChange = (fieldId, value) => {
  // This needs to be implemented or passed as a prop
  console.log("Field value changed:", fieldId, value);
  // If you have a prop for updating field values, use it here
};

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 border border-gray-200 rounded-md hover:border-gray-400 cursor-move bg-white"
    >
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            onBlur={saveLabel}
            onKeyDown={(e) => e.key === 'Enter' && saveLabel()}
            autoFocus
            className="border p-1 rounded"
          />
        ) : (
          <span className="font-medium">{label}</span>
        )}
   
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:underline text-sm"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            Edit
          </button>
          
          <button
    className="text-red-500 hover:underline text-sm"
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      onDelete(field.id);
    }}
  >
    Delete
  </button>
        </div>
      </div>
      <FieldRenderer field={{ field, label, required: isRequired }} handleFieldChange={handleFieldChange}/>
      <div className="flex justify-end mt-2">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={isRequired}
            onChange={toggleRequired}
            className="mr-2"
          />
          Required
        </label>
      </div>
    </div>
  );
};
 
export default DraggableField;
 
 