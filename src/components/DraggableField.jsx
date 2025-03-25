import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FieldRenderer from './FieldRenderer';

const DraggableField = ({ field }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '1rem',
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="p-2 border border-gray-200 rounded-md hover:border-gray-400 cursor-move bg-white"
    >
      <FieldRenderer field={field} />
    </div>
  );
};

export default DraggableField;