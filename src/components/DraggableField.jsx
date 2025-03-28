// import React from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import FieldRenderer from './FieldRenderer';

// const DraggableField = ({ field }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id });
  
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     marginBottom: '1rem',
//   };
  
//   return (
//     <div 
//       ref={setNodeRef} 
//       style={style} 
//       {...attributes} 
//       {...listeners}
//       className="p-2 border border-gray-200 rounded-md hover:border-gray-400 cursor-move bg-white"
//     >
//       <FieldRenderer field={field} />
//     </div>
//   );
// };

// export default DraggableField;
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FieldRenderer from './FieldRenderer';
 
const DraggableField = ({ field, onLabelChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id });
 
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '1rem',
  };
 
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(field.label);
 
  const handleLabelChange = (e) => setLabel(e.target.value);
 
  const saveLabel = () => {
    setIsEditing(false);
    onLabelChange(field.id, label);
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
        <button
          className="ml-2 text-blue-500 hover:underline text-sm"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      </div>
      <FieldRenderer field={{ ...field, label }} />
    </div>
  );
};
 
export default DraggableField;
 
 