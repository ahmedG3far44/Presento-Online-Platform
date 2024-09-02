"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import UploadImage from "./UploadImage";

function UploadCvForm() {
  const [cvFile, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState(null);
  const { userId } = useParams();
  const router = useRouter();

  const handleUploadCvFile = async (e) => {
    e.preventDefault();
    setLoading(true);
    // check the file isn't empty
    if (!cvFile) {
      setErrorMessage("upload cv error ");
    }
    if (cvFile.size > 483988) {
      setErrorMessage("the file size is too large.");
    }
    const acceptedFileTypes = [".pdf", ".docx", ".txt"];
    if (!acceptedFileTypes.includes(cvFile.type)) {
      setErrorMessage(
        "this file type not supported, only supported types PDF | DOCX | TXT ."
      );
    }

    // check the size of file || type of file is correct
    const formData = new FormData();
    formData.append("cv-file", cvFile);
    try {
      const request = await fetch(
        `http://localhost:4000/api/${userId}/upload-cv`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!request.ok) {
        setErrorMessage("upload cv error ");
      }
      const data = request.json();
      router.refresh();
      return data;
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full mt-8 flex justify-start items-start">
      <UploadImage
        fileFormName={"cv-file"}
        url={"resume"}
        acceptedTypes={"files"}
        className={"w-1/2  max-sm:w-full max-md:w-full"}
      />
    </div>
  );
}

export default UploadCvForm;
