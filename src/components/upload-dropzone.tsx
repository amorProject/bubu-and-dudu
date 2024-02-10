"use client";

"use client";

import { ChevronDown, ChevronUp, Trash, Upload } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Image } from "./modals/create-post";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
export default function UploadDropzone({
  onFileChange,
}: {
  onFileChange: Dispatch<SetStateAction<Image[]>>;
}) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<Image[]>([]);
  const [hoveringFiles, setHoveringFiles] = useState(false);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  useEffect(() => {
    setFileUrls([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onFileChange(files);
  }, [files, onFileChange]);

  function handleChange(e: any) {
    e.preventDefault();
    if (files.length >= 4) return;
    const allowedFileCount = 4 - files.length;
    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files["length"]; i++) {
        if (i >= allowedFileCount) return;
        // @ts-ignore
        setFiles((prevState: any) => [
          ...prevState,
          { file: e.target.files[i], title: e.target.files[i].name },
        ]);
        setFileUrls((prevState) => [
          ...prevState,
          URL.createObjectURL(e.target.files[i]),
        ]);
      }
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (files.length >= 4) return;
    const allowedFileCount = 4 - files.length;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        if (i >= allowedFileCount) return;
        // @ts-ignore
        setFiles((prevState: any) => [
          ...prevState,
          {
            file: e.dataTransfer.files[i],
            title: e.dataTransfer.files[i].name,
          },
        ]);
        setFileUrls((prevState) => [
          ...prevState,
          URL.createObjectURL(e.dataTransfer.files[i]),
        ]);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(idx: any) {
    const newArr = [...files] as Image[];
    const newFileUrls = [...fileUrls];
    newArr.splice(idx, 1);
    newFileUrls.splice(idx, 1);
    const emptyArr = [] as unknown as any[];
    setFiles(emptyArr);
    setFileUrls(emptyArr);
    setFiles(newArr);
    setFileUrls(newFileUrls);
  }

  const moveFileInArray = (idx: number, direction: "up" | "down") => {
    const newFiles = [...files] as Image[];
    const [removed] = newFiles.splice(idx, 1);
    const [removedUrl] = fileUrls.splice(idx, 1);
    if (direction === "up") {
      newFiles.splice(idx - 1, 0, removed);
      fileUrls.splice(idx - 1, 0, removedUrl);
    } else {
      newFiles.splice(idx + 1, 0, removed);
      fileUrls.splice(idx + 1, 0, removedUrl);
    }
    setFiles(newFiles);
    setFileUrls(fileUrls);
  };

  function openFileExplorer() {
    if (hoveringFiles && files.length > 0) return;
    if (files.length >= 4) return;
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="flex items-center justify-center h-fit w-full">
      <form
        className={`${
          dragActive ? "bg-accent" : "border-border"
        } border p-4 w-full rounded-lg min-h-[10rem] text-center flex flex-col items-center justify-center px-0`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onClick={openFileExplorer}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".png,.jpg,.jpeg,.gif"
        />

        {files.length >= 1 && (
          <div
            className="flex flex-col items-center p-3 gap-3 m-0"
            onMouseEnter={() => setHoveringFiles(true)}
            onMouseLeave={() => setHoveringFiles(false)}
          >
            {files.map((file, idx) => (
              <div className="flex" key={idx}>
                <div
                  className={`flex w-[500px] items-center justify-center gap-y-2 bg-secondary p-2 rounded-md gap-3`}
                >
                  <img
                    src={fileUrls[idx] || ""}
                    alt={file.title}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="text-start">
                    <Input
                      variant="noOutline"
                      className="w-80"
                      sizeC="md"
                      value={file.title}
                      onChange={(e) => {
                        const newFiles = [...files];
                        newFiles[idx].title = e.target.value;
                        setFiles(newFiles);
                      }}
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => removeFile(idx)}
                  >
                    <Trash size={24} />
                  </Button>
                </div>
                <div className="flex flex-col gap-2 pl-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-8 h-8"
                    disabled={idx === 0}
                    onClick={() => moveFileInArray(idx, "up")}
                  >
                    <ChevronUp size={24} />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="w-8 h-8"
                    disabled={idx === files.length - 1}
                    onClick={() => moveFileInArray(idx, "down")}
                  >
                    <ChevronDown size={24} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-3">
          {files.length < 1 && <Upload size={48} />}
          <p className="text-center text-muted-foreground flex gap-x-2 items-center">
            <span className="text-white">({files.length}/4)</span>
            Drag and drop or click to upload images
          </p>
        </div>
      </form>
    </div>
  );
}
