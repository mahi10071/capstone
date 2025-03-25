import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import DraggableField from './DraggableField';

const SortableFieldList = ({ fields, onFieldsChange }) => {
  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Handle reordering of fields
  const onDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex(item => item.id === active.id);
      const newIndex = fields.findIndex(item => item.id === over.id);
      
      const newItems = [...fields];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
      
      onFieldsChange(newItems);
    }
  };

  return (
    <DndContext 
      collisionDetection={closestCenter} 
      sensors={sensors} 
      onDragEnd={onDragEnd}
    >
      <SortableContext 
        items={fields.map(field => field.id)} 
        strategy={verticalListSortingStrategy}
      >
        {fields.length === 0 ? (
          <p className="text-gray-400 p-4 border-2 border-dashed border-gray-300 text-center rounded">
            Drag fields here to build your form
          </p>
        ) : (
          fields.map((field) => (
            <DraggableField key={field.id} field={field} />
          ))
        )}
      </SortableContext>
    </DndContext>
  );
};

export default SortableFieldList;