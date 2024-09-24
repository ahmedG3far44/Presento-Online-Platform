"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/app/components/loaders/Loader";
import { LuImagePlus } from "react-icons/lu";

function UploadImage({ id, url, className, fileFormName, acceptedTypes }) {
  const uploadFileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successUpload, setSuccessUpload] = useState(null);
  const { userId } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const handleUploadFiles = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!file) {
        setError("your not uploaded a file yet!!");
      }
      if (!validAcceptedFiles(file, acceptedTypes)) {
        setError(
          "not valid file maybe the file type not supported or size is more than (4MB)."
        );
      }
      const formData = new FormData();
      formData.append(fileFormName, file);

      const uploadFile = await fetch(
        `http://localhost:4000/api/${userId}/${url}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await uploadFile.json();

      if (!data.success) {
        toast({
          variant: "destructive",
          title: "uploaded file success",
          description: data.message,
        });
        setError(data.message);
        return { success: false, message: data.message };
      } else {
        toast({
          title: "uploaded file success",
          description: data.message,
        });
        setSuccessUpload("upload completed success");
        setTimeout(() => setSuccessUpload(null), 1000);
        uploadFileRef?.current?.reset();
        setError(null);
        router.refresh();
        return { success: true, message: "uploaded successful" };
      }
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUploadFiles}
      ref={uploadFileRef}
      className={cn(
        className,
        ` duration-150  p-8 bg-card border rounded-md border-none  flex flex-col justify-start items-start gap-2
        ${error && "border-rose-500"}
        ${loading && "opacity-1"}`
      )}
    >
      <label
        className="cursor-pointer hover:bg-secondary  duration-150 w-full border-2 border-dashed bg-primary-foreground rounded-md p-4 flex flex-col justify-center items-center gap-4p"
        htmlFor="upload"
      >
        <span className="text-muted-foreground">
          <LuImagePlus size={20} />
        </span>
        <p className="text-center text-sm w-3/4 max-md:w-full p-2 flex flex-col justify-center items-center gap-1">
          upload your resume here <br /> supported formats, pdf | docx | word
          (4MB).
        </p>
      </label>
      <input
        id="upload"
        className={
          file
            ? "p-2 bg-secondary w-full rounded-md flex justify-center items-center flex-col"
            : "hidden"
        }
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
          <div className="rounded-md flex justify-start items-start gap-4  p-2">
            <Loader />
            <h1>uploading...</h1>
          </div>
        </div>
      )}

      {error && <div className="error_message"> {error}</div>}
      {successUpload && <div className="success_message"> {successUpload}</div>}

      <input
        type="submit"
        className="submit_button"
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
