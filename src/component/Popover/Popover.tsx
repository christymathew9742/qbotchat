"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import EmojiPicker from "emoji-picker-react";
import { Editor } from "@tiptap/react";
import ImageIcon from '@mui/icons-material/Image';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const StyledPopoverContent = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    background: "white",
    height: "auto",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
}));

const Arrow = styled("div")(() => ({
    position: "absolute",
    width: "10px",
    height: "10px",
    backgroundColor: "white",
    transform: "rotate(45deg)",
    boxShadow: "-3px -3px 5px rgba(0, 0, 0, 0.1)",
}));

const StyledButton = styled(Button)(() => ({
    backgroundColor: "rgba(128, 0, 128, 0.2)", // Light purple
    color: "purple",
    ":hover": {
        backgroundColor: "rgba(128, 0, 128, 0.4)",
    },
    marginTop: "8px",
}));

const ErrorText = styled(Typography)(() => ({
    color: "red",
    fontSize: "12px",
    marginBottom: "8px",
}));

const getIcon = (type: string) => {
    switch (type) {
        case "image":
            return <ImageIcon className="text-darkgreen text-[10px] animate-pulse" />;
        case "youtube":
            return <YouTubeIcon className="text-darkgreen text-[10px] animate-pulse" />;
        case "video":
            return <VideoLibraryIcon className="text-darkgreen text-[10px] animate-pulse" />;
        case "emoji":
            return <span className="text-darkgreen text-[10px] animate-pulse">😊</span>;
        default:
            return null;
    }
};

const EditorPopover = ({
    type,
    editor,
}: {
    type: "image" | "video" | "youtube" | "emoji";
    editor: Editor | null;
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    let icon:any = ""
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();

        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setUrl("");
        setError(""); 
        setShowEmojiPicker(false);
    };

    const validateURL = (url: string) => {
        if (type === "youtube") {
            return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url);
        }
        return true
    };

    const handleInsert = () => {
        if (!editor) return;
        if (!url) {
            setError("URL is required.");
            return;
        }

        if (!validateURL(url)) {
            setError(`Please provide a valid ${type} URL.`);
            return;
        }

        switch (type) {
            case "image":
                editor.chain().focus().setImage({ src: url }).run();
                break;
            case "youtube":
                editor.chain().focus().setYoutubeVideo({ src: url }).run();
                break;
            case "youtube":
                break;
            default:
            console.error("Unsupported type");
        }

        handleClose();
    };

    const handleEmojiClick = (emojiObject: { emoji: string }) => {
        if (editor) {
        editor.chain().focus().insertContent(emojiObject.emoji).run();
        }
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? "custom-popover" : undefined;

    return (
        <div>
            <span
                onMouseDown={handleClick}
                className="flex items-center justify-start cursor-pointer space-x-2"
            >
                {getIcon(type)}
            </span>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                    transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                    PaperProps={{
                    sx: { overflow: "visible" },
                }}
            >
                <Arrow
                sx={{
                    top: "-5px",
                    left: "20px",
                }}
                />
                <StyledPopoverContent>
                {type === "emoji" ? (
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                ) : (
                    <>
                       <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder={`Enter ${type} URL`}
                                value={url}
                                onChange={(e) => {
                                setUrl(e.target.value);
                                setError("");
                                }}
                                className="w-3/4 p-2 text-sm bg-gray-100 rounded-lg focus:ring-purple-500 focus:ring-2 focus:outline-none"
                            />
                            <button
                                onClick={handleInsert}
                                className="w-1/4 px-4 py-2 bg-purple-500 text-white text-sm rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform focus:ring-2 focus:ring-purple-400 focus:outline-none"
                            >
                                OK
                            </button>
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </>
                )}
                </StyledPopoverContent>
            </Popover>
        </div>
    );
};
export default EditorPopover;














