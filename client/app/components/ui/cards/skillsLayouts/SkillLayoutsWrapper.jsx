function SkillLayoutsWrapper({ skillLayoutStyle, children }) {
  return (
    <section
      className={`w-full  gap-4 m-auto
            ${
              skillLayoutStyle === "1" &&
              "grid max-lg:grid-cols-4  lg:grid-cols-4  max-md:grid-cols-3  max-sm:grid-cols-2  content-center"
            }
            ${
              skillLayoutStyle === "2" &&
              " grid max-lg:grid-cols-4 lg:grid-cols-4  max-md:grid-cols-3  max-sm:grid-cols-2 content-center"
            }
            ${
              skillLayoutStyle === "3" &&
              " flex justify-center items-center gap-4 "
            }
            ${
              skillLayoutStyle === "4" &&
              " flex justify-start items-start  gap-4 flex-wrap"
            }
            ${
              skillLayoutStyle === "5" &&
              " flex justify-start items-start  gap-4  flex-wrap"
            }
        `}
    >
      {children}
    </section>
  );
}

export default SkillLayoutsWrapper;
