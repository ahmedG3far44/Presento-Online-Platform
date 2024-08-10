"use client";
import { useState } from "react";
import ExperienceCard from "../../cards/ExperienceCard";
import Image from "next/image";
import NoImage from "@/public/noImage.png";
import { Button } from "@/components/ui/button";
// import ConfirmDelete from "../../popup/ConfirmDelete";
function ExperiencesForm() {
  const [isOpen, setOpen] = useState(false);
  const [experienceState, setExperiences] = useState({
    cName: "Global Tech Company",
    cLogo:
      "https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png",
    position: "Senior Software Engineer",
    role: "lorem text",
    start: "2022-07-03",
    end: "2020-03-03",
    location: "Alexandria, Egypt",
  });
  const [experiencesList] = useState([
    {
      cName: "Global Tech Company",
      cLogo:
        "https://marketplace.canva.com/EAFzBWDe1BU/1/0/1600w/canva-colorful-brain-digital-world-technology-logo-tlkbhvlSUdg.jpg",
      position: "Senior Software Engineer",
      role: "creating secured api's and refactor old project based also emplementing and design high scale backend applications",
      start: "2020-09-13",
      end: "2023-07-23",
      location: "Alexandria, Egypt",
    },
    {
      cName: "Target Social Media Agency ",
      cLogo:
        "https://png.pngtree.com/template/20190223/ourmid/pngtree-sphere-digital-world-globe-logo-concept-design-template-image_60187.jpg",
      position: "Senior Software Engineer",
      role: "lorem text",
      start: "2016-08-15",
      end: "2018-05-11",
      location: "Tokyo, Japan",
    },
    {
      cName: "AI New Generation Support",
      cLogo:
        "https://s.tmimgcdn.com/scr/1200x627/113700/modele-de-logo-de-conception-de-marketing-numerique_113749-original.jpg",
      position: "Senior Software Engineer",
      role: "lorem text",
      start: "2017-12-30",
      end: "2015-07-03",
      location: "Alexandria, Egypt",
    },
    {
      cName: "Global Tech Company",
      cLogo:
        "https://img.freepik.com/premium-vector/awesome-m-logo_95982-138.jpg",
      position: "Senior Software Engineer",
      role: "creating secured api's and refactor old project based also emplementing and design high scale backend applications",
      start: "2010-09-13",
      end: "2013-05-01",
      location: "Alexandria, Egypt",
    },
  ]);
  const [updateState, setUpdateState] = useState(false);
  return (
    <div className="w-full h-screen flex flex-col justify-start items-start gap-8">
      <div className="w-full flex justify-start items-start flex-row-reverse p-8 gap-8">
        <section className="w-3/4 h-full  p-8 flex justify-center items-center border-2 border-dashed gap-8 rounded-md">
          <ExperienceCard
            cLogo={experienceState.cLogo}
            cName={experienceState.cName}
            start={experienceState.start}
            end={experienceState.end}
            role={experienceState.role}
            position={experienceState.position}
            location={experienceState.location}
          />
        </section>
        <form className="w-1/3 flex flex-col justify-start items-start gap-2 p-4 rounded-md border">
          <input
            value={experienceState.cName}
            onChange={(e) =>
              setExperiences({ ...experienceState, cName: e.target.value })
            }
            className="p-2 w-full rounded-md "
            type="text"
            placeholder="company name"
          />
          <input
            value={experienceState.cLogo}
            onChange={(e) =>
              setExperiences({ ...experienceState, cLogo: e.target.value })
            }
            className="p-2 w-full rounded-md "
            type="url"
            placeholder="company logo url"
          />
          <input
            value={experienceState.position}
            onChange={(e) =>
              setExperiences({
                ...experienceState,
                position: e.target.value,
              })
            }
            className="p-2 w-full rounded-md"
            type="text"
            placeholder="your position or Job-title"
          />
          <textarea
            value={experienceState.role}
            onChange={(e) =>
              setExperiences({ ...experienceState, role: e.target.value })
            }
            className="w-full  p-2 rounded-md"
            placeholder="my role "
            name="role"
            id="role"
          ></textarea>
          <div className="flex justify-center items-center gap-4 mb-1 ">
            <label className="text-sm">
              Start Date
              <input
                value={experienceState.start}
                onChange={(e) =>
                  setExperiences({
                    ...experienceState,
                    start: e.target.value,
                  })
                }
                className="p-2 w-full rounded-md "
                type="date"
                placeholder="start date"
              />
            </label>
            <label className="text-sm ">
              End Date
              <input
                value={experienceState.end}
                onChange={(e) =>
                  setExperiences({
                    ...experienceState,
                    end: e.target.value,
                  })
                }
                className="p-2 w-full rounded-md "
                type="date"
                placeholder="end date"
              />
            </label>
          </div>
          <input
            value={experienceState.location}
            onChange={(e) =>
              setExperiences({
                ...experienceState,
                location: e.target.value,
              })
            }
            className="p-2 w-full rounded-md "
            type="text"
            placeholder="enter the job location"
          />

          <Button
            variant="outline"
            className={`w-full disabled:bg-gray-400`}
            type="submit"
            onClick={() => {
              setUpdateState(false);
            }}
          >
            {updateState ? "save changes" : "Add Experience"}
          </Button>
        </form>
      </div>
      <main className="w-full p-8">
        <h1>List of user Experiences</h1>
        <ul className="w-full rounded-md mt-10 flex flex-col justify-start items-start gap-2 ">
          {experiencesList.map((exp, index) => {
            return (
              <li
                key={index}
                className="w-full flex justify-start items-center gap-8  py-4 px-2 border-b"
              >
                <div className="w-10 h-10 overflow-hidden rounded-md flex justify-center items-center border  ">
                  <Image
                    src={exp.cLogo || NoImage}
                    className="object-cover w-full h-full rounded-md"
                    width={40}
                    height={40}
                    alt="experience company logo image"
                  />
                </div>
                <h1>{exp.cName}</h1>
                <h1 className="ml-5">{exp.position}</h1>
                <div className="ml-auto flex justify-center items-center gap-4 self-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUpdateState(true);
                      setExperiences({ ...exp });
                    }}
                    disabled={updateState}
                    className=" disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {updateState ? "updating..." : "update"}
                  </Button>
                  {updateState ? null : (
                    <Button
                      variant="destructive"
                      onClick={() => confirm("are you sure about that")}
                    >
                      delete
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default ExperiencesForm;
