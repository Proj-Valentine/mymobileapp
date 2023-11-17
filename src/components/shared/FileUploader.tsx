//  Note all this is from the documentationS page

import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

// define the interface for the uploader props
//  fieldChange is a function that accepts FILES of type array of files and doesnt return anything ie void
// media url is a string
type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string;
}

const FileUploader = ({fieldChange, mediaUrl}: FileUploaderProps) => {
  //useState<FIle[]>() : <FIle[]> is used to define what file is ie an array of files

  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  // defining file types to accept
  const { getRootProps, getInputProps } = useDropzone(
    {
      onDrop,
      accept: { "image/*": [".png", ".jpeg", ".jpg", '.svg'] },
    }
  );

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".png", ".jpeg", ".jpg"],
//     },
//   });

  return (
    <div
      {...getRootProps()}
      className=" flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex felx-1 justify-center w-full p-5 lg:p-10">
            <img
              src={fileUrl}
              alt="image"
              className="file_uploader-img"
              // className="rounded-full"
            />
          </div>
            <p className="file_uploader-label">
              {" "}
              Click or drag photo to replace
            </p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            {" "}
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6"> SVG,PNG,JPG </p>
          <Button className="shad-button_dark_4"> Select from device</Button>
        </div>
      )}
      {/* {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )} */}
    </div>
  );
};

export default FileUploader;
