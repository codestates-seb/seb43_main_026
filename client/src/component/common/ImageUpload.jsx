import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { TiCameraOutline } from 'react-icons/ti';

const UploadCon = styled.div`
  margin-top: 100px;
  width: 400px;
  display: flex;
  justify-content: center;
  padding: 50px;
  border-top: 2px dashed ${(props) => props.theme.color.main_blue};
  border-bottom: 2px dashed ${(props) => props.theme.color.main_blue};
  cursor: pointer;
  .drop-zone {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .drop-comment {
      font-size: 18px;
      margin-top: 20px;
    }
  }
`;
const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <UploadCon {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          {image ? (
            <img src={image} alt="Preview" width={400} height={500} />
          ) : (
            <div className="drop-zone">
              <TiCameraOutline size={50} color="gray" />
              <p className="drop-comment">Drag files or click to upload</p>
            </div>
          )}
        </>
      )}
    </UploadCon>
  );
};

export default ImageUpload;
