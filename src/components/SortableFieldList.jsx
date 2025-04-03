import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import DraggableField from './DraggableField';


const SortableFieldList = ({ fields, onFieldsChange,
  onDelete, onFieldValueChange, errors }) => {
    // console.log("📥 onFieldsChange received in SortableFieldList:", onFieldsChange);
    // console.log("📥 Fields received in SortableFieldList:", fields); // Debugging

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  // console.log(fields);
  const onDragEnd = (event) => {
    const { active, over } = event;
    console.log("🔥 Drag Event:", event); // Debugging

    // if (active.id !== over.id) {
      if (!over || active.id === over.id) return;

      const oldIndex = fields.findIndex(item => item.id === active.id);
      const newIndex = fields.findIndex(item => item.id === over.id);
      console.log("📌 Old Index:", oldIndex, "New Index:", newIndex); // Debugging

      if (oldIndex === -1 || newIndex === -1) return;

      const newItems = [...fields];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
      console.log("🔄 Fields after reordering:", newItems); // Debugging

      onFieldsChange(newItems);

      // onFieldsChange(newItems);
      // if (typeof onFieldsChange === "function") {
      //   console.log("Calling onFieldsChange with:", newItems);

      //   onFieldsChange(newItems);  // Ensure `onFieldsChange` is a function
      // } else {
      //   console.error("onFieldsChange is not a function", onFieldsChange);
      // }
    }
  
  const handleLabelChange = (id, newLabel) => {
    onFieldsChange(fields.map(field =>
      field.id === id ? { ...field, label: newLabel } : field
    ));
  };
  
  const handleFieldValueChange = (id, value) => {
    if (typeof onFieldValueChange === 'function') {
      onFieldValueChange(id, value);
    } else {
      console.warn("onFieldValueChange not provided to SortableFieldList");
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
            <DraggableField key={field.id} field={field}  onLabelChange={handleLabelChange}  onDelete={onDelete} 
            handleFieldChange={handleFieldValueChange} // Pass the handler function

            />
          ))
        )}
      </SortableContext>
    </DndContext>
  );
};

export default SortableFieldList;