import React from "react";

function ProjectDetailsPage({ params }) {
  const { projectId } = params;
  return (
    <div>
      <h1>project ID: {projectId}</h1>
    </div>
  );
}

export default ProjectDetailsPage;
