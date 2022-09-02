import React, { useState } from "react";

export default function UploadImage() {
  const [imageToSend, setImageToSend] = useState({});

  const uploadPicture = (e) => {
    setImageToSend({
      imagePreview: URL.createObjectURL(e.target.files[0]),
      imageAsFile: e.target.files[0],
    });
  };

  const setImageAction = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", imageToSend.imageAsFile);

    console.log(imageToSend.imageAsFile);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const data = await fetch(
      "http://localhost:5000/intcommapi/v1/auth/register",
      {
        method: "post",

        body: formData,
      }
    );
    const uploadedImage = await data.json();
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }
  };

  return (
    <div className="content landing">
      <form onSubmit={setImageAction}>
        <input type="file" name="image" onChange={uploadPicture} />
        <br />
        <br />
        <button type="submit" name="upload">
          Upload
        </button>
      </form>
    </div>
  );
}

/*export default function uploadImage() {
  const [imageToSend, setImageToSend] = useState({});

  const uploadPicture = (e) => {
    setImageToSend({
      imagePreview: URL.createObjectURL(e.target.files[0]),
      imageAsFile: e.target.files[0],
    });
  };

  const setImageAction = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", imageToSend.imageAsFile);

    console.log(image.imageAsFile);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const data = await fetch("http://localhost:3000/upload/post", {
      method: "post",

      body: formData,
    });
    const uploadedImage = await data.json();
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }
  };

  return (
    <div className="content landing">
      <form onSubmit={setImageAction}>
        <input type="file" name="image" onChange={uploadPicture} />
        <br />
        <br />
        <button type="submit" name="upload">
          Upload
        </button>
      </form>
    </div>
  );
}

// import React, { useState } from "react";
// import axios from "axios";

// export default function UploadImage() {
//   const uploadFiles = async (e) => {
//     const img = e.target.files[0];
//     const form = new FormData();
//     form.append("appImgs", img);
//     console.log(form);
//     try {
//       let request = await axios
//         .post("http://localhost:5000/intcommapi/v1/auth/upload", {
//           body: form,
//         })
//         .then((result) => {
//           console.log(result);
//         });
//       const resp = await request.json();
//       console.log(resp);
//     } catch (err) {
//       console.log("error upload failed", err);
//     }
//   };

//   return (
//     <div>
//       <h1>File upload</h1>
//       <input type="file" onChange={(e) => uploadFiles(e)} />
//     </div>
//   );
//}

// const [fileData, setFileData] = useState();
// const [hardcoded, setHardCoded] = useState({
//   valueone: "string",
//   valuetwo: "string",
//   valuethree: "number",
// });
// const fileChangeHandler = (e) => {
//   const files = e.target.files[0];
//   console.log(files);
//   const dataFromForm = new FormData();
//   dataFromForm.set("file", files);
//   console.log(dataFromForm);
// };

// const submitHandler = async (e) => {
//   e.preventDefault();

//   const postReq = await axios
//     .post("http://localhost:5000/intcommapi/v1/auth/register", {
//       body: { body: "ok" },
//     })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

{
  /* <form
action="http://localhost:5000/intcommapi/v1/auth/register"
onSubmit={submitHandler}
method="POST"
>
<div className="form-group">
  <label htmlFor="upload-image-file"></label>
  <input
    type="file"
    className="form-control-file"
    name="upload"
    id="upload"
    placeholder="upload-image-file"
    aria-describedby="fileHelpId"
    onChange={fileChangeHandler}
  />
  <small id="fileHelpId" className="form-text text-muted">
    Please select the image to be uploaded...
  </small>
</div>

<button type="submit" className="btn btn-primary" value="Upload">
  Upload
</button>
</form> */
//}
