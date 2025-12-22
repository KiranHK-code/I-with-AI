import { useState } from "react";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a resume");

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);

    const res = await fetch("http://192.168.93.107:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setText(data.extractedText);
    setLoading(false);
  };

  return (
    <div>
      <h2>Resume Upload – i-with-ai</h2>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload & Extract
      </button>

      {loading && <p>Extracting text...</p>}

      {text && (
        <>
          <h3>Extracted Resume Text</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
        </>
      )}
    </div>
  );
};

export default ResumeUpload;
