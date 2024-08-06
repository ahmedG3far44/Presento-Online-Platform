"use client";
import { useState } from "react";
import HeroLayout from "../../cards/HeroLayout";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-hook-form";
import { updateBio } from "@/app/actions/update/actions";
function BioForm() {
  const [bioState, setBioState] = useState({
    name: "Ahmed Gafar Kamal",
    bio: "lorem text here add your bio or summary about your current job or other experiences",
    imgUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    jobTitle: "Senior Software Engineer",
    layoutStyle: "1",
  });
  // const { errors, action } = useFormState(updateBio, bioState);
  //   const [layouts] = useState([1, 2, 3, 4, 5]);
  return (
    <div className="flex flex-col gap-10">
      <HeroLayout
        name={bioState.name}
        summary={bioState.bio}
        jobTitle={bioState.jobTitle}
        img={bioState.imgUrl}
        layoutStyle={bioState.layoutStyle}
      />
      <form className="w-1/2  flex flex-col justify-start items-start gap-2 p-4 rounded-md border">
        <input
          onChange={(e) => setBioState({ ...bioState, name: e.target.value })}
          className="w-full p-2 rounded-md"
          type="text"
          placeholder="your name"
        />
        <textarea
          maxLength={500}
          minLength={10}
          onChange={(e) => setBioState({ ...bioState, bio: e.target.value })}
          className="w-full p-2 rounded-md"
          placeholder="enter your summary here"
          name="bio"
          id="bio"
        ></textarea>
        <input
          onChange={(e) =>
            setBioState({ ...bioState, jobTitle: e.target.value })
          }
          className="w-full p-2 rounded-md"
          type="text"
          placeholder="current job title"
        />
        <input
          onChange={(e) => setBioState({ ...bioState, imgUrl: e.target.value })}
          className="w-full p-2 rounded-md "
          type="url"
          placeholder="hero image url"
        />
        <select
          onChange={(e) =>
            setBioState({ ...bioState, layoutStyle: e.target.value })
          }
          required
          name="layout"
          className="w-full p-2 rounded-md "
          placeholder="select your layout"
        >
          <option value="1">Align Center</option>
          <option value="2">Align Start</option>
          <option value="3">Align Row</option>
          <option value="4">Align Row Reverse</option>
          <option value="5">Align Between</option>
        </select>
        <Button
          variant="outline"
          className=" w-full
          disabled:bg-gray-400"
          type="submit"
        >
          {"save changes"}
        </Button>
      </form>
    </div>
  );
}

export default BioForm;
