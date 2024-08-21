function SkillLayoutsWrapper({ skillLayoutStyle, children }) {
  return (
    <section
      className={`w-full p-4 gap-4
            ${skillLayoutStyle === "1" && "grid grid-cols-3  justify-center "}
            ${skillLayoutStyle === "2" && " grid grid-cols-4 content-center "}
            ${
              skillLayoutStyle === "3" &&
              " flex justify-start items-center  flex-wrap"
            }
            ${
              skillLayoutStyle === "4" &&
              " flex justify-start items-start flex-wrap"
            }
            ${
              skillLayoutStyle === "5" &&
              " flex justify-start items-start   flex-wrap"
            }
        `}
    >
      {children}
    </section>
  );
}

export default SkillLayoutsWrapper;
