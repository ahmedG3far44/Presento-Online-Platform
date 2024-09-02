"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const ResumeDownloadBtn = () => {
  const { userId } = useParams();
  const [resume, setResume] = useState();

  useEffect(() => {
    async function getUserResume() {
      try {
        // http://localhost:4000/api/kp_3a7d740ac35f4862837192415dc03f67/resume
        const request = await fetch(
          `http://localhost:4000/api/${userId}/resume`
        );
        const data = request.json();
        return data;
      } catch (error) {
        console.error(error.message);
        return error;
      }
    }
    const data = getUserResume();
    data
      .then((response) => {
        setResume(response.resume);
      })
      .catch((error) => {
        setResume(null);
      });
  }, [userId]);
  return (
    <>
      {resume && (
        <button className="px-4 py-2 rounded-md border my-4 hover:bg-muted duration-150">
          <Link
            target="_blank"
            className="hover:underline duration-100"
            href={resume}
          >
            {" "}
            Download CV
          </Link>
        </button>
      )}
    </>
  );
};

export default ResumeDownloadBtn;
