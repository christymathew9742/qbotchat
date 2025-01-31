"use client";

// import React, { useCallback, useState } from "react";
// import ReactFlow, {
//   addEdge,
//   Background,
//   Controls,
//   Connection,
//   Edge,
//   Node,
//   applyNodeChanges,
//   applyEdgeChanges,
//   NodeChange,
//   EdgeChange,
//   ReactFlowProvider,
// } from "reactflow";
// import "reactflow/dist/style.css";

// // Initial nodes and edges
// const initialNodes: Node[] = [
//   {
//     id: "1",
//     type: "default",
//     data: { label: "Initial Node" },
//     position: { x: 50, y: 50 }, // Top-left corner
//     style: {
//       fontSize: "12px",
//       fontFamily: "Arial, sans-serif",
//       color: "#333",
//       textAlign: "center",
//       padding: "4px",
//       background: "#fff",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//     },
//   },
// ];

// const initialEdges: Edge[] = [];

// const App = () => {
//   const [nodes, setNodes] = useState<Node[]>(initialNodes);
//   const [edges, setEdges] = useState<Edge[]>(initialEdges);

//   const onNodesChange = useCallback(
//     (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange = useCallback(
//     (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback(
//     (params: Connection) => {
//       setEdges((eds) => addEdge(params, eds));
//     },
//     []
//   );

//   const onConnectStart = useCallback((_, { nodeId, handleType }) => {
//     // This is called when a connection starts
//     if (nodeId && handleType === "source") {
//       const sourceNode = nodes.find((node) => node.id === nodeId);

//       if (sourceNode) {
//         // Create a new node near the source node
//         const newNode: Node = {
//           id: `${nodes.length + 1}`,
//           data: { label: `Node ${nodes.length + 1}` },
//           position: {
//             x: sourceNode.position.x + 150,
//             y: sourceNode.position.y, // Place it horizontally next to the source node
//           },
//           type: "default",
//           style: {
//             fontSize: "12px",
//             fontFamily: "Arial, sans-serif",
//             color: "#333",
//             textAlign: "center",
//             padding: "4px",
//             background: "#fff",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//           },
//         };

//         setNodes((nds) => [...nds, newNode]);

//         // Optionally create an edge connecting the source to the new node
//         const newEdge: Edge = {
//           id: `e${sourceNode.id}-${newNode.id}`,
//           source: sourceNode.id,
//           target: newNode.id,
//         };

//         setEdges((eds) => [...eds, newEdge]);
//       }
//     }
//   }, [nodes]);

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         background: "#f0f0f0",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onConnectStart={onConnectStart}
//         fitView
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

// export default function AppWrapper() {
//   return (
//     <ReactFlowProvider>
//       <App />
//     </ReactFlowProvider>
//   );
// }


// import React, { useState } from 'react';
// import { useEditor, EditorContent, Editor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';

// const DynamicTiptapEditors = () => {
//   const [editorConfigs, setEditorConfigs] = useState([{ id: Date.now(), content: '<p>Write your option here...</p>' }]);

//   const addEditor = () => {
//     setEditorConfigs((prev) => [
//       ...prev,
//       { id: Date.now(), content: '<p>Write your option here...</p>' },
//     ]);
//   };

//   const removeEditor = (id) => {
//     setEditorConfigs((prev) => prev.filter((config) => config.id !== id));
//   };

//   return (
//     <div className="p-4">
//       {/* Main Title */}
//       <div className="mb-4">
//         <h2 className="text-2xl font-bold">Main Title</h2>
//       </div>

//       {/* Dynamic Editors */}
//       <div>
//         {editorConfigs.map(({ id, content }) => {
//           const editor = new Editor({
//             extensions: [StarterKit],
//             content,
//           });

//           return (
//             <div key={id} className="mb-4 border border-gray-200 p-2 rounded">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-gray-700 font-semibold">Option</span>
//                 <button
//                   onClick={() => removeEditor(id)}
//                   className="text-red-500 text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//               {editor && <EditorContent editor={editor} />}
//             </div>
//           );
//         })}
//       </div>

//       {/* Add Option Button */}
//       <div>
//         <button
//           onClick={addEditor}
//           className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//         >
//           Add Option
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DynamicTiptapEditors;




import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

const UndoRedoReactFlow = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", data: { label: "Node 1" }, position: { x: 250, y: 0 } },
    { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
  ]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [flowHistory, setFlowHistory] = useState([{ nodes, edges }]);
  const [currentStep, setCurrentStep] = useState(0);

  const updateHistory = (newNodes: Node[], newEdges: Edge[]) => {
    const newHistory = [...flowHistory.slice(0, currentStep + 1), { nodes: newNodes, edges: newEdges }];
    setFlowHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      setNodes(updatedNodes);
      updateHistory(updatedNodes, edges);
    },
    [nodes, edges]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      setEdges(updatedEdges);
      updateHistory(nodes, updatedEdges);
    },
    [nodes, edges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const updatedEdges = addEdge(params, edges);
      setEdges(updatedEdges);
      updateHistory(nodes, updatedEdges);
    },
    [nodes, edges]
  );

  const undo = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setNodes(flowHistory[prevStep].nodes);
      setEdges(flowHistory[prevStep].edges);
      setCurrentStep(prevStep);
    }
  };

  const redo = () => {
    if (currentStep < flowHistory.length - 1) {
      const nextStep = currentStep + 1;
      setNodes(flowHistory[nextStep].nodes);
      setEdges(flowHistory[nextStep].edges);
      setCurrentStep(nextStep);
    }
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <button onClick={undo} disabled={currentStep === 0}>
            Undo
          </button>
          <button onClick={redo} disabled={currentStep === flowHistory.length - 1}>
            Redo
          </button>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          // Viewport changes like zoom/pan won't be added to history since they don't trigger onNodesChange or onEdgesChange.
        />
      </div>
    </ReactFlowProvider>
  );
};

export default UndoRedoReactFlow;
















