"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Handle,
  Position,
  Controls,
  Background,
  NodeChange,
  EdgeChange,
  Node,
  Edge,
  NodeProps,
  useReactFlow,
  ReactFlowInstance,
  ReactFlowProvider,
  MarkerType,
} from "reactflow";
import { getBotSelector, getPendingSelector, getWebSocketStatusSelector } from "@/redux/reducers/chatBot/selectors";
import { useSearchParams,useRouter, usePathname } from 'next/navigation';
import { AppDispatch } from "@/redux/store";
import {
  postBotRequest,
  fetchBotRequest, 
  updateBotRequest,
  webSocketConnected,
} from "@/redux/reducers/chatBot/actions";
import { POST_BOT_REQUEST,UPDATE_BOT_REQUEST } from "@/redux/reducers/chatBot/actionTypes";
import { useDispatch, useSelector } from 'react-redux';
import { messageIcons, groupIcons, replayIcons, decodeHtml } from "@/utils/utils";
import { Editor, EditorContent } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrash, 
  faArrowLeft,
  faPowerOff,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Image from '@tiptap/extension-image'
import Youtube from "@tiptap/extension-youtube";
import { Plugin } from 'prosemirror-state';
import { Mark } from '@tiptap/core';
import "reactflow/dist/style.css";
import {constantsText} from "../../constant/constant"
import { IconButton } from "@mui/material";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import { toast } from "react-toastify";

const {
  BOT:{
    DEFAULT,
    STEP,
    SAVE,
    ICON_TITLE1,
    ICON_TITLE2,
    ICON_TITLE3,
    BOT_TITLE,
  },
} = constantsText;

type Input = {
  id: string;
  type: string;
  field: string;
  value: string; 
  editor?: any;
}

type CustomNodeData = {
  inputs: Input[];
  label:string;
  nodeCount:number;
  setInputs: (callback: (inputs: Input[]) => Input[]) => void;
  deleteField: (id: string) => void;
};

interface NodeData {
  deleteField?: any;
  setInputs?: any;
  inputs?: Array<{ editor?: any; [key: string]: any }>;
}

interface Nod {
  data: NodeData;
  id: string; 
  [key: string]: any;
}

interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

interface FlowData {
  title:String;
  nodes: Nod[];
  edges: Edge[];
  viewport: Viewport;
  status: Boolean;
  update: Boolean;
  data:any;
  botnum: number;
}

interface InitialNodeData {
  inputs: any[];
  value?: any;
  setInputs: (callback: (inputs: any[]) => any[]) => void;
  deleteField: (fieldId: string) => void;
  [key: string]: any;
}

interface InitialBotData {
  data: {
    nodes: Node[];
    edges: any[];
    viewport: { x: number; y: number; zoom: number };
  };
}

interface FlowInstance {
  current: {
    setViewport: (viewport: { x: number; y: number; zoom: number }) => void;
  } | null;
}

const BackgroundColorMark = Mark.create({
  name: 'backgroundColor',

  addAttributes() {
    return {
      backgroundColor: {
        default: 'purple',
      },
    };
  },

  parseHTML() {
    return [
      {
        style: 'background-color',
      },
    ];
  },

  renderHTML() {
    return [
      'span',
      {
        class: `bg-highlight-clr p-[2px] text-node-active w-max rounded`,
      },
      0,
    ];
  },
});

const HighlightMarker = Extension.create({
  name: 'highlightMarker',
  addExtensions() {
    return [BackgroundColorMark];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            input: (view) => {
              const content = view.state.doc.textContent;
              const transaction = view.state.tr;
              const regex = /\[([^\]]+)]\s/g
              let match;
              while ((match = regex.exec(content)) !== null) {
                const start = match.index + 1;
                const end = start + match[0].length;
                const backgroundColorMark = view.state.schema.marks.backgroundColor.create();
                transaction.addMark(start, end+1, backgroundColorMark);
              }
              
              if (transaction.docChanged) {
                view.dispatch(transaction);
              }              
              return false;
            },
          },
        },
      }),
    ];
  },
});

const buttonConfigs = [
  {
    icon: <FormatBoldIcon />,
    action: 'toggleBold',
    isActive: 'bold',
  },
  {
    icon: <FormatItalicIcon />,
    action: 'toggleItalic',
    isActive: 'italic',
  },
];

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data, id }) => {
  const editorRefs = useRef<Map<string, Editor>>(new Map());
  const handilRef = useRef<number | null>(null);
  const [highlightedEditors, setHighlightedEditors] = useState(new Set());
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const { deleteElements, getEdges } = useReactFlow();

  const handleInputChange = (inputId: string, value: string) => {
    data.setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === inputId ? { ...input, value } : input
      )
    );
  };

  const handleDeleteNode = () => {
    const edgesToRemove = getEdges().filter(
      (edge) => edge.source === id || edge.target === id
    );
    deleteElements({
      nodes: [{ id }],
      edges: edgesToRemove,
    });
  };

  const handleDeleteDynamicFields = (fieldId: string) => {
    const edgIndex = handilRef.current;
    if (data.deleteField) {
      data.deleteField(fieldId);
    }
    const edgesToRemove = getEdges().filter(
      (edge) => edge.source === id 
    );
    if (edgIndex == 0) {
      const nextNodeTarget = edgesToRemove.find((edge) => edge.source === id)?.target;
      if (nextNodeTarget) {
        const edgeToDelete = getEdges().filter(
          (edge) => edge.source === id && edge.target === nextNodeTarget
        );
        deleteElements({
          edges: edgeToDelete
        });
      }
    }
  };
  
  const createEditor = (inputId: string, initialContent: string = "") => {
    if (editorRefs.current.has(inputId)) {
      return editorRefs.current.get(inputId);
    }
    const editor = new Editor({
      extensions: [
        StarterKit,
        Highlight,
        Typography,
        HighlightMarker,
        Image,
        Youtube.configure({
          controls: false,
          nocookie: true,
        }),
      ],
      content: initialContent,
      onFocus: () => setIsFocused(inputId),
      onBlur: () => setIsFocused(null),
    });
    editorRefs.current.set(inputId, editor);
    return editor;
  };

  const onDropInput = (event: React.DragEvent) => {
    event.preventDefault();
    const inputDataStr = event.dataTransfer.getData("application/reactflow-input");
    if (!inputDataStr) return;
    try {
      const { type, field } = JSON.parse(inputDataStr);
      const newNodeId = `${id}-input-${Date.now()}`; 
      const newInput: Input = {
        id: newNodeId,
        type,
        field: field || "messages",
        value: "",
      };

      createEditor(newInput.id);
      data.setInputs((prevInputs) => [...prevInputs, newInput]);
    } catch (error) {
      console.error("Error parsing input data:", error);
    }
  };

  const onDragOver = (event: React.DragEvent) => event.preventDefault();

  data.inputs.forEach((input) => {
    let editor = editorRefs.current.get(input.id);
    if (!editor) {
      editor = createEditor(input.id, input.value);
    }
    if (editor) {
      editor.off("update");
      editor.on("update", () => {
        const updatedContent = editor.getHTML();
        if (updatedContent !== input.value) {
          handleInputChange(input.id, updatedContent);
        }

        if (!input.value) {
          handleInputChange(input.id, updatedContent);
          setHighlightedEditors((prev) => {
            const updatedSet = new Set(prev);
            updatedSet.delete(input.id);
            return updatedSet;
          });
        } else {
          setHighlightedEditors((prev) => new Set(prev).add(input.id));
        }
      });
    }
  });
  
  useEffect(() => {
    return () => {
      editorRefs.current.forEach((editor) => editor.destroy());
      editorRefs.current.clear();
    };
  }, []);

  const FieldIndex = data.inputs.reduce((lastIndex, input, currentIndex) => {
    if (input.field === 'replay') {
      return currentIndex;
    }
    return lastIndex; 
  }, -1);
  return (
    <div className="group rounded w-44" onDrop={onDropInput} onDragOver={onDragOver}>
      <h2
        className={`${
          !data.inputs.length ? "text-center" : "text-left"
        } font-semibold text-sm font-sans mb-2 text-text-theme`}
      >
        {!data.inputs.length ? DEFAULT : data.label}
      </h2>
      <Handle type="target" position={Position.Left} className="absolute -!right-3 !top-4 !h-7 opacity-0" />
      {data.nodeCount > 1 && (
        <FontAwesomeIcon
          icon={faTrash}
          className="text-drag-text absolute right-1 top-1 text-xxxs hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out p-1 cursor-pointer opacity-0 group-hover:opacity-100"
          onClick={handleDeleteNode}
        />
      )}
      <div className="flex flex-col gap-2">
        {data.inputs.map(({ id, field }, index) => {
          const editor:Editor | any = editorRefs.current.get(id);
          return (
            <div
              key={id}
              className={`flex flex-col rounded-md p-1 ${isFocused === id ? `border-${field}-node` : `${field}-node-normal`}`}
            >
              {editor && (
                <div className="relative tiptap-editor-container nodrag cursor-text text-left">
                  {FieldIndex == index && field == "replay" && (
                    (handilRef.current = index),
                    <Handle 
                      type="source" 
                      position={Position.Right}
                      className="absolute !right-[-13px] top-1/2 text-[10px] !w-[8px] !h-[8px] !bg-node-active !border-2 !border-solid !border-[#f069b1]"
                    />
                  )}
                    {isFocused === id && ( 
                    <>
                      <div className="grid grid-cols-8 gap-x-1">
                        {buttonConfigs.map(({ icon, action, isActive }, key) => (
                          <div
                            key={key}
                            className="ml-2 flex items-center justify-center space-x-1"
                          >
                            <IconButton
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                editor.chain().focus()[action]().run();
                              }}
                              sx={{ padding: "5px" }}
                            >
                              {React.cloneElement(icon, {
                                sx: {
                                  fontSize: "16px",
                                  color: editor.isActive(isActive)
                                    ? "#272323"
                                    : "inherit",
                                },
                              })}
                            </IconButton>
                            <FontAwesomeIcon 
                              icon={faTrash} 
                              className="text-drag-text absolute -right-1 -top-1 text-xxxs hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out p-1 cursor-pointer" 
                              onMouseDown={() => handleDeleteDynamicFields(id)}
                            />
                          </div>
                        ))}
                      </div>
                      <hr className="border-t-1 border-divider" />
                    </>
                    )}
                  <EditorContent
                    onClick={() => setIsFocused(id)}
                    editor={editor}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode,
};

const Order = () => {
  const botData = useSelector(getBotSelector); 
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isTitleEmpt, setIsTitleEmpt] = useState(false);
  const [title, setTitle] = useState<String | any>('');
  const titleRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPath = usePathname()
  const chatbotId:string | any = searchParams.get('botId'); 
  const botNum:string | any = searchParams.get('botNum'); 
  const isConnected = useSelector(getWebSocketStatusSelector);
  const isPending = useSelector(getPendingSelector);
  const generatedId:string | any = botData?.data?._id || '';
  const { screenToFlowPosition } = useReactFlow();
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => {
        const updatedEdges = applyEdgeChanges(changes, eds);
        return updatedEdges.map((edge) => ({
          ...edge,
          type: 'smoothstep',
          label:"x",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#f069b1'
          },
        }));
      });
    },[]
  );

  const onEdgeClick = useCallback(
    (event:any, edge:any) => {
      event.stopPropagation();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }, []
  );
  
  const onConnect = useCallback(
    (params: any) => {
      const newEdge: Edge = {
        id: `e${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
        type: "smoothstep",
        label:"x",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#f069b1',
        },
      };
  
      setEdges((eds) => addEdge(newEdge, eds));
    },
    []
  );

  const onDropNode = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData("application/reactflow-node");
      if (!nodeType) return;

      const position = screenToFlowPosition({
        x:event.clientX, 
        y:event.clientY
      });
      const newNodeId = `group-${Date.now()}`; 
      const newNode: Node<CustomNodeData> = {
        id: newNodeId,
        type: nodeType,
        position,
        data: {
          inputs: [],
          nodeCount: nodes.length+1,
          label: `${STEP}${nodes.length+1}`,
          setInputs: (callback) =>
            setNodes((nds) =>
              nds.map((node) =>
                node.id === newNodeId
                  ? { ...node, data: { ...node.data, inputs: callback(node.data.inputs) } }
                  : node
              )
            ),
          deleteField: (id) =>
            setNodes((nds) =>
              nds.map((node) =>
                node.id === newNodeId
                  ? {
                      ...node,
                      data: {
                        ...node.data,
                        inputs: node.data.inputs.filter((input) => input.id !== id),
                      },
                    }
                  : node
              )
            ),
        },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, screenToFlowPosition]
  );

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const sanitizeNode = (node: Nod): Nod => ({
    ...node,
    data: {
      ...node.data,
      deleteField: null,
      setInputs: null,
      inputs: node.data?.inputs?.map((input) => {
        if (input.editor) {
          const { editor, ...rest } = input;
          return { ...rest };
        }
        return input;
      }) || [],
    },
  });

  const isEmptyField = (data: { inputs?: { value: string }[] }): boolean => {
    return (
      Array.isArray(data?.inputs) &&
      data.inputs.length > 0 &&
      data.inputs.every(({ value }) => {
        const content =
          new DOMParser().parseFromString(value, "text/html").body.textContent || "";
        return content.trim() !== "";
      })
    );
  };
  
  const sanitizeFlowData = (flowData: FlowData): FlowData => ({
    ...flowData,
    title: title,
    nodes: flowData.nodes.map((node) => sanitizeNode(node)),
    botnum: Number(botNum),
    edges: flowData.edges.map((edge) => ({
      ...edge,
    })),
    status: true,
    viewport: {
      ...flowData.viewport,
    },
  });

  const saveData = useCallback(
    async () => {
      if (!reactFlowInstance.current) {
        console.error("React Flow instance is not available");
        return;
      }
      const flowData: FlowData | any = reactFlowInstance.current.toObject();
      const sanitizedData = sanitizeFlowData(flowData);
      const botData = { ...sanitizedData };
      const update = flowData.nodes.length > 0 
        && flowData.nodes.every((node:FlowData) => 
          isEmptyField(node?.data));
      
      if (isTitleEmpt) {
        toast.error('The title cannot be empty');
        return;
      }
  
      if (!update) {
        toast.error('The node or its fields are empty.');
        return;
      }

      try {
        const action = chatbotId
        ? updateBotRequest({ id: chatbotId, payload: { ...botData } })
        : postBotRequest({ ...botData });
        const result = await dispatch(action);
        const successMessage = `${botData?.title ?? "Chatbot"}`;
        const handleSuccess = (message: string) => toast.success(message);
        const handleError = (message: string) => toast.error(message);
        switch (result.type) {
          case POST_BOT_REQUEST:
            handleSuccess(`${successMessage} saved successfully.`);
            break;
          case UPDATE_BOT_REQUEST:
            handleSuccess(`${successMessage} updated successfully.`);
            break;
          default:
            handleError("Error saving data.");
        }

      } catch (error) {
        console.error("Error saving data:", error);
        toast.error("Error saving data");
      }
    },
    [chatbotId, dispatch,title]
  );

  const updateNodeData = (nodeId: string, updateCallback: (data: InitialNodeData) => InitialNodeData) => {
    setNodes((nds:any) =>
      nds.map((node:any) =>
        node.id === nodeId ? { ...node, data: updateCallback(node.data) } : node
      )
    );
  };

  const createNode = (
    id: string,
    type: string | any,
    position: { x: number; y: number },
    dataOverrides: Partial<InitialNodeData>
  ): Node => ({
    id,
    type,
    position,
    data: {
      ...dataOverrides,
      setInputs: (callback:any) => 
        updateNodeData(id, (data) => 
          ({ ...data, inputs: callback(data.inputs) })),

      deleteField: (fieldId:any) =>
        updateNodeData(id, (data) => ({
          ...data,
          inputs: data.inputs.filter((input) => input.id !== fieldId),
        })),
    },
  });

  const initializeNodeData = (
    botData: InitialBotData | null,
    reactFlowInstance: ReactFlowInstance |  FlowInstance | any
  ) => {
    const initialNode = createNode("group-1", "customNode", { x: 0, y: 0 }, {
      inputs: [],
      nodeCount: nodes.length,
      label: `${STEP}1`,
    });

    if (
      botData?.data?.nodes &&
      botData?.data?.edges &&
      botData?.data?.viewport
    ){
      const sanitizedNodes = botData.data.nodes.map((node) =>
        createNode(node.id, node.type, node.position, {
          ...node.data,
          value: node.data.value,
        })
      );

      setNodes(sanitizedNodes);
      setEdges(botData.data.edges);

      if (reactFlowInstance.current) {
        reactFlowInstance.current.setViewport(botData.data.viewport);
      }
    } else {
      setNodes([initialNode]);
    }
  };

  useEffect(() => {
    const socketUrl = 'ws://localhost:5000';
    const socket = new WebSocket(socketUrl);
    const handleSocketEvents = () => {
      socket.onopen = () => {
          dispatch(webSocketConnected());
          if (chatbotId) dispatch(fetchBotRequest(chatbotId));
      };
      socket.onerror = (event:any) =>  
        event.message && 
        console.error("WebSocket Error:", event.message);
      socket.onmessage = (event) => {
          const message = event.data;
          console.log("WebSocket Message",message)
      };
      socket.onclose = () => console.log("WebSocket closed");
    };
    handleSocketEvents();

    return () => socket.close();
  }, [dispatch, chatbotId,socket]); 

  useEffect(() => {
    if (botData) {
      initializeNodeData(botData, reactFlowInstance.current);
      setTitle(chatbotId ? botData?.data?.title : `${BOT_TITLE}${botNum}` || '');
    }
  }, [botData, reactFlowInstance]);

  useEffect(() => {
    if (generatedId && generatedId !== chatbotId) {
      router.replace(`${currentPath}?botId=${generatedId}`, { scroll: false });
    }
  }, [generatedId, chatbotId, currentPath, router]); 

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
    instance.setViewport({ x: 50, y: 100, zoom: 1 });
    if (titleRef.current) {
      titleRef.current.select();
    }
  }, [reactFlowInstance,titleRef]);

  const handleInputTitleChange = useCallback((e:any) => {
    const value = e.target.value;
    setTitle(e.target.value ?? `${botNum}`);
    setIsTitleEmpt(value === "")
  }, [title]);

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeClick={onEdgeClick}
        onConnect={onConnect}
        onDrop={onDropNode}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        onInit={onInit}
      >
        <Background 
          gap={2} 
          size={1} 
          className="bg-cover bg-center bg-no-repeat object-cover christy" 
          style={{ backgroundImage: "url('Qbot/qbotbg.jpg')"}}
        />
      </ReactFlow>
      <div className="fixed top-2 right-2 bottom-2 w-full sm:w-48 bg-node-active p-3 rounded-lg shadow-lg overflow-y-auto z-50">
        <h4 className="text-drag-text mb-1 text-xs font-bold">{ICON_TITLE1}</h4>
        <hr className="mb-3 border-b border-divider" />
        <div className="grid grid-cols-2 gap-y-2 gap-x-1">
          {messageIcons.map(({ type, icon }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => {
                const inputData = { type, field: "messages" };
                e.dataTransfer.setData("application/reactflow-input", JSON.stringify(inputData));
              }}
              className="bg-node-active border-2 border-dotted border-drag-border p-[4px] rounded cursor-grab text-drag-text text-xxxs mb-1"
            >
              {icon} {type}
            </div>
          ))}
        </div>
        <h4 className="text-drag-text mb-1 mt-3 text-xs font-bold">{ICON_TITLE2}</h4>
        <hr className="mb-3 border-b border-divider" />
        <div className="grid grid-cols-2 gap-y-2 gap-x-1">
          {replayIcons.map(({ type, icon }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => {
                const inputData = { type, field: "replay" };
                e.dataTransfer.setData("application/reactflow-input", JSON.stringify(inputData));
              }}
              className="bg-node-active border-2 border-dotted border-drag-border p-[4px] rounded cursor-grab text-drag-text text-xxxs mb-1"
            >
              {icon} {type}
            </div>
          ))}
        </div>
        <h4 className="text-drag-text mb-1 mt-3 text-xs font-bold">{ICON_TITLE3}</h4>
        <hr className="mb-3 border-b border-divider" />
        <div>
          {groupIcons.map(({ type, icon }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("application/reactflow-node", 'customNode');
              }}
              className="bg-node-active border-2 border-dotted border-drag-border p-[4px] rounded cursor-grab text-drag-text text-xxxs mb-1"
            >
              {icon} {type}
            </div>
          ))}
        </div>
        <button
          onClick={saveData}
          className="w-full border-solid border text-drag-border p-[4px] rounded transition-all border-drag-border hover:bg-divider hover:scale-105"
        >
          {SAVE}
        </button>
      </div>
      <div className="fixed top-2 left-2 w-[90%] sm:w-[30%] h-auto bg-node-active p-1 rounded-lg shadow-lg z-50 flex flex-col sm:flex-row gap-2">
        <button
          className="flex items-center justify-center h-4 p-[10px] bg-[rgb(240 241 246)] rounded shadow border-1 border-solid border-drag-border"
          onClick={()=> router.push('/chatbots')}
        >
          <PowerSettingsNewIcon  
            sx={{
              color:'#ff065e', 
              fontSize:'14px', 
              '&:hover': {color:'#9c0909'}
            }}
          />
        </button>
        <input
          type="text"
          ref={titleRef}
          value={title || ""}
          onChange={handleInputTitleChange}
          className={`text-xxs text-text-theme -ml-1 flex-1 h-4 p-[10px] rounded focus:outline-none hover:outline-none border-1 border-solid ${isTitleEmpt ? 'border-error' : 'border-drag-border'}`}
        />
      </div>
    </div>
  );
};

export default function OrderWrapper() {
  return (
    <ReactFlowProvider>
      <Order />
    </ReactFlowProvider>
  );
}














