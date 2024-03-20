import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Img from './Img';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");
  const [uploadedImg, setUpload] = useState<string>("");

  function previewFiles(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Set the file preview to the reader result
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      previewFiles(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post<{ public_id: string }>("http://localhost:8001", {
        image: image
      });
      const uploadedImg = result.data.public_id;
      setUpload(uploadedImg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fileInput">Upload your photo</label>
            <input type="file" id="fileInput" onChange={handleChange} required accept="image/png, image/jpeg" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <img src={image} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
      <Img uploadedImg={uploadedImg}/>
    </>
  );
};

export default App;
