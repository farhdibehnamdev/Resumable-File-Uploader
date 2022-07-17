import FileUploader from "./index";
const log = function (html) {
  document.getElementById("log").innerHTML = html;
  console.log(html);
};
const onProgress = function (loaded, total) {
  log("progress " + loaded + " / " + total);
};

(function () {
  let uploader;
  document.forms.upload.onsubmit = async function (e) {
    e.preventDefault();

    let file = this.elements.myfile.files[0];
    if (!file) return;

    uploader = new FileUploader(file, onProgress);

    try {
      let uploaded = await uploader.upload();
      if (uploaded) {
        log("success");
      } else {
        log("stopped");
      }
    } catch (err) {
      console.error(err);
      log("error");
    }
  };
});
