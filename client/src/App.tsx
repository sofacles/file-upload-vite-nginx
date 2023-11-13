import "./App.css";

function App() {
  // the action fieldin the form below needs a full url on my dev machine.
  // nginx magic maps "/api" for me on the deployment server.
  return (
    <div>
      <img
        src="/grnfield.jpg"
        alt="greenfield"
        style={{ height: "100px", width: "140px" }}
      />
      <form
        method="post"
        action="/api"
        name="give-away-paint"
        encType="multipart/form-data"
      >
        <input type="text" name="imageName" value="myNewImage" />
        <input type="file" name="uploadPhoto" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
