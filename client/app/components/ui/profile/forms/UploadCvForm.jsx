import UploadImage from "./UploadImage";

function UploadCvForm() {
  return (
    <div className="bg-card  max-sm:w-full max-md:w-full w-1/2 mt-8 flex justify-start items-start border rounded-md ">
      <UploadImage
        fileFormName={"cv-file"}
        url={"resume"}
        acceptedTypes={"files"}
        className={"w-full max-sm:w-full max-md:w-full"}
      />
    </div>
  );
}

export default UploadCvForm;
