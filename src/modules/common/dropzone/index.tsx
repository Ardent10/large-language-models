import { useAppState } from "@/store";
import { MAX_IMAGE_SIZE } from "@/utils/constants";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import { Error } from "../error";

interface props {
  setDragAndDropFiles?: any;
  name: string;
  control: any;
  removeAllImg?: boolean;
}

export function Dropzone({ setDragAndDropFiles, name, control,removeAllImg }: props) {
  const [file, setFile] = useState<File | null>(null);
  const [state, dispatch] = useAppState();
  const onDrop = (acceptedFiles: { name: string }[]) => {
    setDragAndDropFiles(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  function handleHeaderImageChange(file: File | null) {
    if (!file) {
      // If no file is selected, reset state and return
      setFile(null);
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      // Display error message if file size exceeds 4MB
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: "Image size should be less than 4MB.",
        },
      });
      return;
    } else if (
      file.type &&
      !(
        file?.type?.includes("jpeg") ||
        file?.type?.includes("png") ||
        file?.type?.includes("webp") ||
        file?.type?.includes("jpg") ||
        file?.type?.includes("avif")
      )
    ) {
      // Display error message if file is not an image
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
        },
      });
      return;
    }
    setFile(file);
    return file;
  }

  function removeImage() {
    if(removeAllImg) {
      setDragAndDropFiles(null);
      setFile(null);
    }
    else{
      setDragAndDropFiles(null);
      setFile(null);
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { isTouched, isDirty, error },
        formState: { isValid },
      }) => {
        return (
          <>
            <Box
              border="2px solid #fff"
              borderRadius="8px"
              sx={{
                borderStyle: "dashed",
                cursor: "pointer",
              }}
              p={5}
              {...getRootProps({ className: "dropzone-fileupload row" })}
            >
              <input
                {...getInputProps({ onChange, onBlur })}
                type="file"
                accept="png jpg jpeg gif bmp webp"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                onChange={(e) => {
                  if (e.target?.files) {
                    const file =
                      handleHeaderImageChange(e.target.files[0]) ?? null;
                    onChange(file);
                  }
                }}
              />
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                color="#fff"
              >
                {file ? (
                  <>
                    <Typography
                      key={file?.name}
                      fontSize={16}
                      fontWeight={500}
                      color="green"
                    >
                      {file?.name}
                    </Typography>
                    <Typography fontSize={16} fontWeight={500} color="green">
                      {Math.floor(file.size / 1000)} KB
                    </Typography>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                    >
                      <ClearRoundedIcon fontSize="large" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton>
                      <FileUploadOutlinedIcon fontSize="large" />
                    </IconButton>
                    <Typography fontSize={16} fontWeight={500} color="#fff">
                      {isDragActive
                        ? "Drop the files here..."
                        : "Choose or Drag & drop files here"}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
            <Error error={error} />
          </>
        );
      }}
    />
  );
}
