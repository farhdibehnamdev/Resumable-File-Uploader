import "../scss/style.scss";

export default class FileUploader {
  private fileId;
  private startByte: number;
  private xhr: XMLHttpRequest;
  constructor(public file: File, public onProgress: Function) {
    this.file = file;
    this.onProgress = onProgress;
    this.fileId = file.name + "-" + file.size + "-" + file.lastModified;
    this.startByte = 0;
    this.xhr = new XMLHttpRequest();
  }
  async getUploadedBytes(): Promise<number> {
    return 0;
  }
  async upload(): Promise<void> {
    this.startByte = await this.getUploadedBytes();

    let xhr = this.xhr;
    xhr.open("Post", "upload", true);
    xhr.setRequestHeader("X-File-Id", this.fileId);

    xhr.setRequestHeader("X-Start-Byte", this.startByte.toString());

    xhr.upload.onprogress = (e): void => {
      this.onProgress(this.startByte + e.loaded, this.startByte + e.total);
    };

    xhr.send(this.file.slice(this.startByte));

    return await new Promise((resolve: Function, reject: Function) => {
      xhr.onload = xhr.onerror = () => {
        console.log(
          "upload end status:" + xhr.status + " text:" + xhr.statusText
        );
        if (xhr.status == 200) {
          resolve(true);
        } else {
          reject(new Error("Upload failed: " + xhr.statusText));
        }
      };
      xhr.onabort = () => resolve(false);
    });
  }

  stop() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}
