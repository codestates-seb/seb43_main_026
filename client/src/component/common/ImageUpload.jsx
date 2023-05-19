import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { TiCameraOutline } from 'react-icons/ti';
import { COLOR, SIZE } from '../../style/theme';

// styled-component
const DropZoneContainer = styled.div`
  width: 100%;
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

  @media screen and (min-width: ${SIZE.tablet}) {
    padding: 50px;
  }
`;

const UploadContainer = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  > div {
    display: flex;
    justify-content: center;
    > img {
      max-width: 60%;
    }
  }

  @media screen and (min-width: ${SIZE.desktop}) {
    > img {
      width: 30%;
    }
  }
`;

// component

const ImageUpload = ({ imageUrl, setImageUrl, imageData, setImageData }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      // 서버로 전송하기 위해 form data로 변환
      const formData = new FormData();
      formData.append('image', acceptedFiles[0]);
      setImageData(formData);
      // console.log(imageData.get('image'));
    },
    [imageUrl, setImageData, imageData]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <UploadContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div>
          {imageUrl ? (
            <img src={imageUrl} alt="Preview" />
          ) : (
            <DropZoneContainer>
              <TiCameraOutline size={50} color="gray" />
              <p>Drag files or click to upload</p>
            </DropZoneContainer>
          )}
        </div>
      )}
    </UploadContainer>
  );
};

export default ImageUpload;
