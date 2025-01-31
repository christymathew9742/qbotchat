"use client";

import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  TextField,
  TablePagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getBotSelector, getPendingSelector } from "@/redux/reducers/chatBot/selectors";
import { deleteBotRequest, fetchBotRequest } from "@/redux/reducers/chatBot/actions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Loader from "@/component/Loader/Loader";
import Link from "next/link";
import { toast } from "react-toastify";

const Skeleton = styled("div")<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
}));

const ChatBot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const botData = useSelector(getBotSelector);
  const [page, setPage] = useState(1);
  const pendingStatus = useSelector(getPendingSelector)
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    fetchBots();
  }, [page, rowsPerPage, search, status]);

  const fetchBots = () => {
    const queryObject = { 
      search,
      status,
      page,
      limit: rowsPerPage,
    };
    const queryString = new URLSearchParams(queryObject as any).toString();
    dispatch(fetchBotRequest(queryString));
  };

  const handleDelete = async (id: any, title: string) => {
    try {
        await dispatch(deleteBotRequest(id));
        if (!pendingStatus?.pending) {
          setTimeout(() => {
            fetchBots();
          }, 200);
            toast.success(`${title} deleted successfully`);
        }
    } catch (error) {
        console.log('Error in deleting ChatBot:', error);
        toast.error(`Error in deleting ${title}`);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(botData.data.map((row: any) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxClick = (id: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value as string | null);
    setPage(1);
  };

  // if (!botData) {
  //   return <Lodder />;  // Show loading indicator if data is not available
  // }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Skeleton height={100}>
          <Link href={`/chatbot-details?botNum=${botData?.data?.length + 1}`}>
            <Button variant="contained" color="primary">
              Add New Chatbot
            </Button>
          </Link>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />
          <FormControl variant="outlined" size="small">
            <InputLabel>Status</InputLabel>
            <Select value={status || ""} onChange={handleStatusChange} label="Status">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Enabled</MenuItem>
              <MenuItem value="false">Disabled</MenuItem>
            </Select>
          </FormControl>
        </Skeleton>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < botData?.total}
                    checked={botData?.total > 0 && selected.length === botData?.total}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {botData?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                Array.isArray(botData?.data) && botData?.data?.map((row: any, index: number) => (
                  <TableRow key={row.id || `row-${index}`}>
                    <TableCell padding="checkbox" align="center">
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onChange={() => handleCheckboxClick(row.id)}
                      />
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{new Date(row.updatedAt).toISOString().split("T")[0]}</TableCell>
                    <TableCell align="center">{row.status ? "Enabled" : "Disabled"}</TableCell>
                    <TableCell align="center">
                      <Link href={`/chatbot-details?botId=${row._id}`}>
                        <IconButton>
                          <EditNoteIcon sx={{ color: "#108310" }} />
                        </IconButton>
                      </Link>
                      <IconButton onClick={() => handleDelete(row._id, row.title)}>
                        <DeleteIcon sx={{ color: "#c61919" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={botData.total || 0}
          rowsPerPage={rowsPerPage}
          page={page - 1}  // Use page - 1 for a 0-based index
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
};

export default ChatBot;
















// return field === 'preference' ? (
          //   <div key={`${field}-editor-${id}`} className={`flex flex-col rounded-md p-4 ${isFocused === id ? `border-${field}-node` : `${field}-node-normal`}`}>
          //     {options && (
          //       <>
          //         {Array.isArray(options) && options.map((option, opIndex) => (
          //           <div key={`option-${id}-${opIndex}-${option.id}`}  className="relative flex mb-2">
          //             <Handle
          //               type="source"
          //               id={`option-${id}-${opIndex}-${option.id}`} 
          //               position={Position.Right}
          //               className="absolute !right-[-12px] top-1/2 text-[10px] !w-[8px] !h-[8px] !bg-node-active !border-2 !border-solid !border-op-handil"
          //             />
          //             <div>
          //               <input
          //                 type="text"
          //                 className="px-2 py-[2px] rounded-l-md w-full text-xxm focus:outline-none hover:outline-none border-1 border-solid border-drag-border"
          //                 placeholder={`option- ${opIndex + 1}`}
          //                 value={option?.value}
          //                 onChange={(e) => handleInputChange(id, e.target.value, option?.id,)}
          //               />
          //             </div>
          //             <div>
          //               <button
          //                 className="bg-blue-500 text-white px-2 py-[1px]"
          //                 onClick={() => handleAddEditor(index, id)}
          //               >
          //                 <AddBoxIcon className="text-xxm"/>
          //               </button>
          //             </div>
          //             <div>
          //               <button
          //                 className="bg-red-500 text-white px-2 py-[1px] rounded-r-md"
          //                 onClick={() => handleDeleteEditor(option?.id, index,id,opCount)}
          //               >
          //                 <DeleteIcon className="text-xxm"/>
          //               </button>
          //             </div>
          //           </div>
          //         ))}
          //       </>              
          //     )}
          //   </div>
          // ):(
          //   <div key={`${field}-editor-${id}`}  className={`flex flex-col rounded-md p-1 ${isFocused === id ? `border-${field}-node` : `${field}-node-normal`}`}>
          //     {editor && loadEditor && (
          //       <div id={`editor-${id}`} className="relative tiptap-editor-container nodrag cursor-text text-left">
          //         {isReplay && (
          //           <Handle
          //             type="source"
          //             id={`${field}-${id}}`}
          //             position={Position.Right}
          //             className="absolute !right-[-13px] top-1/2 text-[10px] !w-[8px] !h-[8px] !bg-node-active !border-2 !border-solid !border-[#f069b1]"
          //           />
          //         )}
          //         {isFocused === id && (
          //           <>
          //             <div className="grid grid-cols-8 gap-x-1">
          //               {buttonConfigs.map(({ icon, action, isActive }, tbIndex) => (
          //                 <div key={`${field}-toolbar-${id}-${tbIndex}`} className="ml-2 flex items-center justify-center space-x-1">
          //                   <IconButton
          //                     onMouseDown={(e) => {
          //                       e.preventDefault();
          //                       e.stopPropagation();
          //                       (action: EditorActions) => editor && editor.chain().focus()[action]().run();
          //                       const editorAction = action as EditorActions;
          //                       if (editor) {
          //                         editor.chain().focus()[editorAction]().run();
          //                       }
          //                     }}
          //                     sx={{ padding: "5px" }}
          //                   >
          //                     {React.cloneElement(icon, {
          //                       sx: { fontSize: "16px", color: editor.isActive(isActive) ? "#272323" : "inherit" },
          //                     })}
          //                   </IconButton>
          //                   <FontAwesomeIcon
          //                     icon={faTrash}
          //                     className="text-drag-text absolute -right-1 -top-1 text-xxxs hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out p-1 cursor-pointer"
          //                     onMouseDown={() => handleDeleteDynamicFields(id,index)}
          //                   />
          //                 </div>
          //               ))}
          //             </div>
          //             <hr className="border-t-1 border-divider" />
          //           </>
          //         )}
          //         <EditorContent editor={editor} className="text-xxs" />
          //       </div>
          //     )}
          //   </div>
          // );







