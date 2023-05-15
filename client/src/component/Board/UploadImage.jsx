import { useCallback, useState } from 'react';
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
  }
`;

// component
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

const DropZone = () => {
  return (
    <DropZoneContainer>
      <TiCameraOutline size={50} color="gray" />
      <p>Drag files or click to upload</p>
    </DropZoneContainer>
  );
};

const UploadImage = ({ register }) => {
  const [image, setImage] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      register('image', { value: file, type: 'file' }); // 이미지 파일과 타입을 register 함수로 전달
    },
    [register]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <UploadContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div>
          {image ? <img src={image} alt="Preview" /> : <DropZone></DropZone>}
        </div>
      )}
    </UploadContainer>
  );
};

export default UploadImage;
