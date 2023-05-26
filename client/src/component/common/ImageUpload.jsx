import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { TiCameraOutline } from 'react-icons/ti';
import { COLOR, SIZE } from '../../style/theme';

// styled-component
const UploadContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0 20px;
  padding: 0 60px;
  > div {
    width: 100%;
    height: 100%;
    max-width: 800px;
    display: flex;
    justify-content: center;
    > img {
      max-width: 70%;
    }
  }
  @media screen and (min-width: ${SIZE.tablet}) {
    padding: 0 100px;
    > div {
      > img {
        width: 60%;
      }
    }
  }
  @media screen and (min-width: ${SIZE.desktop}) {
    padding: 0 200px;
    > div {
      > img {
        width: 50%;
      }
    }
  }
`;

const DropZoneContainer = styled.div`
  width: 100%;
  height: 200px;
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
    white-space: nowrap;
  }

  @media screen and (min-width: ${SIZE.tablet}) {
    height: 300px;
    padding: 30px;
    > p {
      font-size: 20px;
    }
  }
`;

const ImageUpload = ({
  imageUrl,
  setImageUrl,
  imageData,
  setImageData,
  register,
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      // 서버로 전송하기 위해 form data로 변환
      const formData = new FormData();
      formData.append('image', acceptedFiles[0]);
      setImageData(formData);
      register('image', { required: true, value: acceptedFiles[0] }); // register에 업로드된 파일 등록
    },
    [imageUrl, setImageData, imageData, register]
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
