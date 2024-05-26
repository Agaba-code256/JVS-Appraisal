import { useState } from "react";
import { imgDB } from "../../firebase/firebase";
import { v4 } from "uuid";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const ImageStore = () => {
  const [txt, setTxt] = useState("");
  const [imgURL, setImgURL] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgRef = ref(imgDB, `Imgs/${v4()}`);
    uploadBytes(imgRef, file).then((snapshot) => {
      console.log(snapshot, "img uploaded");
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        setImgURL(url); // Set the image URL state
      });
    });
  };

  return (
    <div>
      <input type="text" onChange={(e) => setTxt(e.target.value)} />
      <input type="file" onChange={handleUpload} />
      {imgURL && (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={imgURL} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default ImageStore;
