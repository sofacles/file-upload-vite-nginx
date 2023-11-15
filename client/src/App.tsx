import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export type UploadPhotoType = { preview: string; data: File | null };

//const baseServerUrl = "http://localhost:8888";
const baseServerUrl = "/api";

function App() {
  // the action fieldin the form below needs a full url on my dev machine.
  // nginx magic maps "/api" for me on the deployment server.

  const [imageUrl, setImageUrl] = useState("grnfield.jpg");
  const [imageData, setImageData] = useState<File | null>(null);
  const [eventualFileGuid] = useState(uuidv4());

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let formData = new FormData();
    formData.append("imageName", eventualFileGuid);
    formData.append("uploadPhoto", imageData!); //fix

    const response = await fetch("/api/", {
      method: "POST",
      body: formData,
    });
    if (response && response.status === 200) {
      setImageUrl(`resized/${eventualFileGuid}.jpg`);
    }
  };

  return (
    <div>
      <img
        src={`${baseServerUrl}/${imageUrl}`}
        alt="greenfield"
        style={{ height: "100px", width: "140px" }}
      />
      <form
        method="post"
        name="give-away-paint"
        encType="multipart/form-data"
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          type="file"
          name="uploadPhoto"
          onChange={(e) => {
            setImageData(e.target.files![0]);
          }}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
