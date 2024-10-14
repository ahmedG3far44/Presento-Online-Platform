"use client";
import { useState } from "react";

export default function GetData(url) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  try {
    setPending(true);
    const request = fetch(`${url}`);
    const data = request.then((res) => {
      if (!res.status === 200) {
        throw new Error("request failed error 404");
      }
      const response = request.json();
      setSuccess(response.message);
      return response;
    });
  } catch (error) {
    setError(error.message);
  } finally {
    setPending(false);
  }

  return [pending, success, error, data];
}

useSubmit;
