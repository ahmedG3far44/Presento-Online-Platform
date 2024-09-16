function ProjectsLayoutWrapper({ className, projectLayoutStyle, children }) {
  return (
    <section
      className={` ${className}
            ${
              projectLayoutStyle === "1" &&
              "grid  grid-cols-5  content-center  max-md:grid-cols-2 max-sm:grid-cols-1 "
            }
            ${
              projectLayoutStyle === "2" &&
              "grid gap-2 grid-cols-3 content-center max-md:grid-cols-2 max-sm:grid-cols-1 "
            }
            ${
              projectLayoutStyle === "3" &&
              "grid grid-cols-2 content-center max-md:grid-cols-2 max-sm:grid-cols-1  "
            }
            ${
              projectLayoutStyle === "4" &&
              "grid grid-cols-4 content-center max-md:grid-cols-2 max-sm:grid-cols-1 "
            }
            ${
              projectLayoutStyle === "5" &&
              "flex  justify-center items-center flex-wrap"
            }
        `}
    >
      {children}
    </section>
  );
}

export default ProjectsLayoutWrapper;
