import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Categorize({ question, onAnswer }) {
  // question: { options: ['a','b'], categories: ['X','Y'] }
  const initial = question.categories.map((c, idx) => ({ id: idx.toString(), title: c, items: [] }));
  const [columns, setColumns] = useState(() => {
    // put options in 'unassigned' initially
    return {
      unassigned: { id: "unassigned", title: "Items", items: (question.options || []).map((o,i)=>({ id:`i-${i}`, content:o })) },
      ...Object.fromEntries((question.categories||[]).map((c,i)=>[`cat-${i}`, { id:`cat-${i}`, title:c, items:[] }])),
    };
  });

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index===destination.index) return;
    const srcCol = {...columns[source.droppableId]};
    const destCol = {...columns[destination.droppableId]};
    const [moved] = srcCol.items.splice(source.index,1);
    destCol.items.splice(destination.index,0,moved);
    setColumns(c => ({ ...c, [source.droppableId]: srcCol, [destination.droppableId]: destCol }));
    // produce simple answer: map category->items
    const answer = Object.values({...columns, [source.droppableId]:srcCol, [destination.droppableId]:destCol})
      .filter(x=>x.id!=="unassigned")
      .map(col => ({ category: col.title, items: col.items.map(i=>i.content) }));
    onAnswer(answer);
  }

  return (
    <div>
      <div className="mb-2 font-medium">{question.questionText}</div>
      {question.image && <img src={question.image} className="mb-2 w-full h-40 object-cover rounded" alt="" />}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {Object.values(columns).map(col => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 bg-gray-50 rounded flex-1 min-h-[120px]">
                  <div className="text-sm font-semibold mb-2">{col.title}</div>
                  {col.items.map((item, idx)=>(
                    <Draggable draggableId={item.id} index={idx} key={item.id}>
                      {(p) => (
                        <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps} className="p-2 bg-white rounded shadow mb-2">{item.content}</div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
