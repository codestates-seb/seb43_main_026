import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { TiCameraOutline } from 'react-icons/ti';
import { COLOR, SIZE } from '../../style/theme';
import { useSelector, useDispatch } from 'react-redux';
import { setImageUrl, setFile } from '../../redux/slice/imageSlice';

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
  margin-bottom: 30px;
  > div {
    display: flex;
    justify-content: center;
    > img {
      max-width: 60%;
    }
  }

  /* pc버전 */
  @media screen and (min-width: ${SIZE.desktop}) {
    > img {
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
  const imageUrl = useSelector((state) => state.image.imageUrl);
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      dispatch(setImageUrl(imageUrl));
      dispatch(setFile(file));
      console.log(file);
    },
    [dispatch]
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
            <DropZone></DropZone>
          )}
        </div>
      )}
    </UploadContainer>
  );
};

export default ImageUpload;
