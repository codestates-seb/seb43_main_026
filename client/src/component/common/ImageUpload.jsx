import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { TiCameraOutline } from 'react-icons/ti';
import { COLOR, SIZE } from '../../style/theme';

// styled-component
const UploadContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div {
    width: 80%;
    max-width: 800px;
    display: flex;
    justify-content: center;
    > img {
      max-width: 60%;
      @media screen and (min-width: ${SIZE.desktop}) {
        width: 30%;
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
  }

  /* 태블릿 버전 */
  @media screen and (min-width: ${SIZE.tablet}) {
    padding: 50px;
  }
`;

// component

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
      register('image', { value: acceptedFiles[0] }); // register에 업로드된 파일 등록
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
