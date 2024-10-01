"use client";
import { useParams } from "next/navigation";
import { feedBackSchema } from "../../../lib/schema";
import { useState, useRef } from "react";
import { useToast } from "../../../components/ui/use-toast";
import Loader from "../../components/loaders/Loader";

function FeedBackPage() {
  // const [errorMessage, setErrorMessage] = useState([]);
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [feedbackState, setFeedbackState] = useState("text");
  const { toast } = useToast();
  const feedbackFormRef = useRef(null);

  const handleFeedbacks = async (formData) => {
    const profileImage = formData.get("profile");
    const videoFeedback = formData.get("video");
    if (!videoFeedback) {
      formData.delete("video");
      const text = formData.get("feedback");
      if (text.length > 300) {
        throw new Error("feedback text is too long ");
      }
    } else {
      formData.delete("feedback");
    }
    console.log(formData);
    const feedback = {
      name: formData.get("name"),
      position: formData.get("position"),
    };
    try {
      if (profileImage.size > 10000000) {
        throw new Error(
          `this file size is too large ${profileImage.size / 1024 / 1024}MB`
        );
      }

      const validData = feedBackSchema.safeParse(feedback);
      if (!validData.success) {
        console.log(validData.error.flatten().fieldErrors);
        throw new Error("not valid data");
      }
      const request = await fetch(
        `http://localhost:4000/api/${userId}/feedback`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!request.ok) {
        throw new Error("network error check your connection");
      }
      const data = await request.json();

      feedbackFormRef?.current.reset();
      toast({
        title: "added success",
        description: "Your feedback was added successfully",
      });

      return;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "can't add feedback",
        description: error.message,
      });
      // setErrorMessage(error.message);
      return;
    }
  };
  return (
    <section
      className={
        "w-screen h-screen p-4 rounded-md flex flex-col justify-center items-center "
      }
    >
      <h1 className={"p-4 my-8 text-2xl font-bold"}>Add Your Feedback</h1>
      <form
        ref={feedbackFormRef}
        action={async (formData) => {
          try {
            setLoading(true);

            await handleFeedbacks(formData);
          } catch (error) {
            toast({
              variant: "destructive",
              title: error.message,
            });
          } finally {
            setLoading(false);
          }
        }}
        className={
          "bg-card p-4 rounded-md border flex flex-col justify-start items-start gap-4"
        }
      >
        <>
          {loading && (
            <div className="flex justify-center items-center gap-4 p-2 w-full">
              {" "}
              <Loader /> uploading...
            </div>
          )}
        </>
        <input
          className={"p-2 rounded-md w-full bg-secondary  border"}
          type="file"
          name={"profile"}
          placeholder={"enter your title"}
          accept={"image/png , image/jpeg, image/jpg, image/gif, video/mp4"}
        />

        <input
          className={"p-2 rounded-md w-full bg-secondary  border"}
          type="text"
          name={"name"}
          placeholder={"enter your name"}
        />
        <input
          className={"p-2 rounded-md w-full bg-secondary  border"}
          type="text"
          name={"position"}
          placeholder={"enter your position "}
        />
        <div className="w-full p-2 flex justify-start items-center gap-4">
          <button
            type="button"
            className={`min-w-24 border px-4 py-2 rounded-md hover:bg-secondary duration-150 ${
              feedbackState === "video" ? "bg-secondary" : "bg-card "
            }`}
            onClick={() => setFeedbackState("video")}
          >
            Video
          </button>
          <button
            type="button"
            className={`min-w-24 border px-4 py-2 rounded-md hover:bg-secondary duration-150 ${
              feedbackState === "text" ? "bg-secondary" : "bg-card "
            }`}
            onClick={() => setFeedbackState("text")}
          >
            Text
          </button>
        </div>
        <div className="w-full min-h-24">
          {feedbackState === "video" ? (
            <input
              className={"w-full h-full p-2 rounded-md  bg-secondary  border"}
              type="file"
              name={"video"}
              placeholder={"enter your title"}
              accept={"image/png , image/jpeg, image/jpg, image/gif, video/mp4"}
            />
          ) : (
            <textarea
              className={"w-full h-full p-2 rounded-md bg-secondary border"}
              name="feedback"
              id="clientFeedback"
              placeholder={"enter your feedback here"}
            ></textarea>
          )}
        </div>

        <input
          type="submit"
          className={
            "w-full px-4 py-2 rounded-md border hover:bg-secondary cursor-pointer disabled:bg-secondary disabled:cursor-not-allowed"
          }
          disabled={loading}
          value={loading ? "adding..." : "Add Feedback"}
        />
      </form>
    </section>
  );
}

export default FeedBackPage;
