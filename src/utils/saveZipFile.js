export function saveZipFile(data, fileName) {
  // Create a blob object with the data and MIME type
  const blob = new Blob([data], { type: 'application/zip' });

  // Check if the download attribute is supported
  if ('download' in document.createElement('a')) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Append the link to the document body and click it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // If the download attribute is not supported, fallback to opening the file dialog
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const downloadUrl = URL.createObjectURL(new Blob([e.target.result]));

      // Open the file dialog
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.setAttribute('download', fileName);
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Release the object URL
      setTimeout(function () {
        URL.revokeObjectURL(downloadUrl);
      }, 100);
    };
    fileReader.readAsArrayBuffer(blob);
  }
}
