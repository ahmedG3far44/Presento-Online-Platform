function ExperiencesLayoutWrapper({ experienceLayoutStyle, children }) {
  return (
    <section
      className={`
        ${
          experienceLayoutStyle === "1" &&
          `w-full grid grid-cols-2 justify-center gap-4 p-4`
        } 
        ${
          experienceLayoutStyle === "2" &&
          `w-full grid grid-cols-3 justify-center gap-4 p-4`
        } 
        ${
          experienceLayoutStyle === "3" &&
          `w-full flex  flex-col justify-center items-center gap-4 p-4`
        }
        `}
    >
      {children}
    </section>
  );
}

export default ExperiencesLayoutWrapper;
