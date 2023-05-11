import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { TiCameraOutline } from 'react-icons/ti';
import { COLOR, SIZE } from '../../style/theme';

// styled-component
const DropZoneContainer = styled.div`
  width: 80%;
  padding: 20px;
  border-top: 2px dashed ${COLOR.main_blue};
  border-bottom: 2px dashed ${COLOR.main_blue};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    font-size: 16px;
    margin-top: 20px;
  }

  /* 태블릿 버전 */
  @media screen and (min-width: ${SIZE.tablet}) {
    padding: 50px;
  }
`;

const UploadContainer = styled.div`
  /* 모바일 기준 */
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  > image {
    width: 40%;
  }
  /* 태블릿 버전 */
  @media screen and (min-width: ${SIZE.tablet}) {
    > image {
      width: 40%;
    }
  }

  /* pc버전 */
  @media screen and (min-width: ${SIZE.desktop}) {
    > image {
      width: 30%;
    }
  }
`;

// component
const DropZone = () => {
  return (
    <DropZoneContainer>
      <TiCameraOutline size={50} color="gray" />
      <p>Drag files or click to upload</p>
    </DropZoneContainer>
  );
};

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
    <UploadContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          {image ? (
            <img src={image} alt="Preview" className="upload-image" />
          ) : (
            <DropZone></DropZone>
          )}
        </>
      )}
    </UploadContainer>
  );
};

export default ImageUpload;
