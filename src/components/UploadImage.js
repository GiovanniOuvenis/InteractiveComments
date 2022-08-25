import React from "react";

export default function UploadImage() {
  return (
    <form action="/api/images" method="post" enctype="multipart/form-data">
      <input type="file" name="image" />
    </form>
  );
}
