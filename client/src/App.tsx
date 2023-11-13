import "./App.css";

function App() {
  return (
    <div>
      <img
        src="/grnfield.jpg"
        alt="greenfield"
        style={{ height: "100px", width: "140px" }}
      />
      <form
        method="post"
        action="http://localhost:8888/api"
        name="give-away-paint"
        encType="multipart/form-data"
      >
        <input type="file" name="fileX" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
