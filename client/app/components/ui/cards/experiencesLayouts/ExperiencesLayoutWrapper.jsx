function ExperiencesLayoutWrapper({ experienceLayoutStyle, children }) {
  return (
    <section
      className={` gap-4
        ${
          experienceLayoutStyle === "1" &&
          `grid  grid-cols-2  max-sm:grid-cols-1 max-md:grid-cols-1 `
        } 
        ${
          experienceLayoutStyle === "2" &&
          `grid grid-cols-3 content-center max-sm:flex max-md:grid-cols-1 max-sm:flex-col`
        } 
        ${
          experienceLayoutStyle === "3" &&
          `flex  flex-col justify-center items-center gap-0`
        }
        `}
    >
      {children}
    </section>
  );
}

export default ExperiencesLayoutWrapper;
