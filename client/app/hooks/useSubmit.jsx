"use client";
import { useState, useEffect } from "react";
export default function useSubmit(submitFunction) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  try {
    setPending(true);
    submitFunction();
    setSuccess("success message ");
  } catch (error) {
    setError(error.message);
  } finally {
    setPending(false);
  }

  return [pending, success, error];
}

useSubmit;
