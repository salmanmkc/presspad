import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Icon from '../Icon';
import * as T from '../Typography';
import InfoSection from './InfoSection';
import * as S from './style';

import { Row, Col } from '../Grid';

const UploadFile = ({
  maxSize,
  maxSizeText,
  disabled,
  mainText,
  secondaryText,
  error: validationError,
  multiple = false,
  profile,
  type,
  extraInfo,
  files,
  setFiles,
  error: _error,
  col,
}) => {
  // const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const onDropRejected = errors => {
    if (
      errors &&
      errors[0] &&
      errors[0].errors &&
      errors[0].errors[0] &&
      errors[0].errors[0].code
    ) {
      if (errors[0].errors[0].code === 'file-too-large') {
        setError(`File is larger than ${maxSizeText}`);
      } else {
        setError(errors[0].errors[0].message);
      }
    }
  };

  const onMultiDrop = acceptedFiles => {
    const updatedFiles = [
      ...files,
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          new: true,
        }),
      ),
    ].reduce((acc, val) => acc.concat(val), []);
    setFiles(updatedFiles);
  };

  const onSingleDrop = acceptedFiles => {
    const fileToUpload = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        new: true,
      }),
    );

    setFiles(fileToUpload);
  };

  const removeFile = index => {
    const updatedFiles = files.map((file, i) =>
      index !== i ? file : { ...file, deleted: true },
    );
    setFiles(updatedFiles);
  };

  const thumbs = files
    .filter(file => file && !file.deleted && (file.name || file.fileName))
    .map((file, index) => (
      <Col w={profile ? [4, 12, 12] : [4, col || 4, col || 4]}>
        {type === 'file' ? (
          <S.FileWrapper>
            <T.Link
              color="pink"
              isExternal
              href={file.preview}
              download={file.path || file.url}
              mr={2}
              style={{ textDecoration: 'underline' }}
            >
              {file.path || file.fileName}
            </T.Link>
            <S.DeleteBtn onClick={() => removeFile(index)}>
              <Icon
                icon="crossCircle"
                color="pink"
                width="21px"
                height="21px"
              />
            </S.DeleteBtn>
          </S.FileWrapper>
        ) : (
          <S.Thumb key={file.name} profile={profile}>
            <S.ThumbInner image={file.preview}>
              <S.ImageWrap profile={profile}>
                <S.StyledImage src={file.preview || file.url} />
              </S.ImageWrap>
              <S.DeleteBtn onClick={() => removeFile(index)}>
                <Icon
                  icon="crossCircle"
                  color="pink"
                  width="21px"
                  height="21px"
                />
                <T.PXSBold color="pink" ml="1">
                  DELETE
                </T.PXSBold>
              </S.DeleteBtn>
            </S.ThumbInner>
          </S.Thumb>
        )}
      </Col>
    ));

  return (
    <Dropzone
      onDrop={multiple ? onMultiDrop : onSingleDrop}
      multiple={multiple}
      accept={type === 'file' ? 'image/*, .pdf, .doc, .docx' : 'image/*'}
      maxSize={maxSize}
      onDropRejected={onDropRejected}
      disabled={disabled}
    >
      {({ getRootProps, getInputProps }) => (
        <Row>
          <S.UploadContainer profile={profile}>
            {files.filter(
              file => file && !file.deleted && (file.name || file.fileName),
            ).length > 0 && (
              <Col w={profile ? [4, 4, 5] : [4, 12, 12]}>
                <S.ThumbsContainer profile={profile}>
                  {thumbs}
                </S.ThumbsContainer>
              </Col>
            )}
            <Col w={[4, col || 4, col || 4]}>
              <S.BoxWrapper
                {...getRootProps({ className: 'dropzone' })}
                disabled={disabled}
                error={!!error || !!validationError}
              >
                <input {...getInputProps()} />
                <Icon
                  icon="uploadFile"
                  width="40px"
                  height="40px"
                  color="pink"
                  margin="0 0 10px 0"
                />
                <T.PXSBold
                  color="primary"
                  mt={15}
                  style={{ textAlign: 'center' }}
                >
                  {mainText || 'Drag file here or click'}
                </T.PXSBold>
                {secondaryText && (
                  <T.PXS color="gray3" style={{ textAlign: 'center' }}>
                    ({secondaryText})
                  </T.PXS>
                )}
              </S.BoxWrapper>
            </Col>
            {/* <aside>{renderFileName}</aside> */}
          </S.UploadContainer>
          {(error || validationError) && (
            <S.Error>{_error || error || validationError}</S.Error>
          )}
          {extraInfo && <InfoSection text={extraInfo} />}
        </Row>
      )}
    </Dropzone>
  );
};

export default UploadFile;
