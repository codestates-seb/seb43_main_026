import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { TiCameraOutline } from 'react-icons/ti';
import { COLOR, SIZE } from '../../style/theme';
const UploadCon = styled.div`
  /* 모바일 기준 */
  width: 100%;
  display: flex;
  justify-content: center;
  .drop-zone {
    width: 80%;
    padding: 20px;
    border-top: 2px dashed ${COLOR.main_blue};
    border-bottom: 2px dashed ${COLOR.main_blue};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .drop-comment {
      font-size: 16px;
      margin-top: 20px;
    }
    .upload-image {
      width: 40%;
    }
  }

  /* 태블릿 버전 */
  @media screen and (min-width: ${SIZE.tablet}) {
    .drop-zone {
      padding: 50px;
    }
    .upload-image {
      width: 40%;
    }
  }

  /* pc버전 */
  @media screen and (min-width: ${SIZE.desktop}) {
    .upload-image {
      width: 30%;
    }
  }
`;
const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
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
            <img src={image} alt="Preview" className="upload-image" />
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
