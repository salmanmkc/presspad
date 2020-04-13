import React from 'react';

const FileDownload = ({ fileUrl, fileName }) => {
  console.log('hello');
  return (
    <div>
      <button type="button" as="a" href={fileUrl}>
        {fileName}
      </button>
    </div>
  );
};

export default FileDownload;
