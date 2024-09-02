"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
function UploadImage({ id, url, className, fileFormName, acceptedTypes }) {
  const uploadFileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(null);
  const [error, setError] = useState(null);
  const [successUpload, setSuccessUpload] = useState(null);
  const { userId } = useParams();
  const router = useRouter();

  const handleUploadFiles = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadingProgress("0");
    // valid file types and size
    if (!file) {
      setError("your not uploaded a file yet!!");
      setLoading(false);
      return;
    }
    // acceptedTypes === image || file
    if (!validAcceptedFiles(file, acceptedTypes)) {
      // the file type not accepted or size too large
      setError(
        "not valid file maybe the file type not supported or size is more than (4MB)."
      );
      setLoading(false);
      return;
    }
    setUploadingProgress("50");
    // send file to endpoints
    // create formData instance
    const formData = new FormData();
    formData.append(fileFormName, file);
    // request parameters

    const uploadFile = await fetch(
      `http://localhost:4000/api/${userId}/${url}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = uploadFile.json();
    data
      .then(() => {
        setSuccessUpload("upload completed success");
        setTimeout(() => setSuccessUpload(null), 1000);
        setUploadingProgress("100");
        setLoading(false);

        uploadFileRef?.current?.reset();

        router.refresh(`/${userId}`);
        return data;
      })
      .catch(() => {
        setError("upload not completed");
        setUploadingProgress("0");
        setLoading(false);
        return;
      });
  };

  return (
    <form
      onSubmit={handleUploadFiles}
      ref={uploadFileRef}
      className={cn(
        className,
        ` duration-150  p-8 bg-muted rounded-xl border-none  flex flex-col justify-start items-start gap-2
        ${error && "border-rose-500"}
        ${loading && "opacity-1"}`
      )}
    >
      <input
        className="p-4 flex justify-center items-center flex-col"
        type="file"
        required
        accept={
          acceptedTypes === "image"
            ? "image/png, image/jpeg, image/jpg, image/gif"
            : `application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document,
    application/msword `
        }
        onChange={(e) => setFile(e.target.files[0])}
      />
      {loading && (
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <div className="border rounded-md flex justify-start items-start gap-4  p-4">
            <span className="border-r border-zinc-500 animate-spin w-4 h-4 rounded-full"></span>{" "}
            <h1>uploading...</h1>
          </div>
        </div>
      )}
      {error && (
        <div className="text-rose-500 border border-red-500 p-4 rounded-md">
          {" "}
          {error}
        </div>
      )}
      {successUpload && (
        <div className="w-full text-green-700 bg-green-200 border border-green-800 p-4 rounded-md">
          {" "}
          {successUpload}
        </div>
      )}
      <input
        type="submit"
        className="w-full bg-primary-foreground hover:bg-muted-foreground duration-150 cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-500 border px-4 py-2 rounded-md"
        disabled={loading}
        value={loading ? "uploading..." : "upload"}
      />
    </form>
  );
}

export default UploadImage;

function validAcceptedFiles(file, acceptedTypes) {
  const resumeAcceptedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "text/plain",
  ];
  const imagesAcceptedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
  ];
  if (acceptedTypes === "image") {
    if (imagesAcceptedTypes.includes(file.type)) {
      if (file.size > 4000000) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  } else {
    if (resumeAcceptedTypes.includes(file.type)) {
      if (file.size > 4000000) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
