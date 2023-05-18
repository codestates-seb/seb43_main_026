package com.codestates.amazonaws.service;


import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;


@Service
public class AmazonS3ClientService {

    @Autowired
    private AmazonS3 s3Client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    public String uploadFileToS3Bucket(MultipartFile multipartFile, String fileName){
        try{
            // todo:

            if (multipartFile == null || multipartFile.isEmpty()) {
                throw new IllegalArgumentException("업로드할 파일이 전달되지 않았습니다.");
            }


            File file = convertMultiPartFileToFile(multipartFile);
            s3Client.putObject(new PutObjectRequest(bucketName, fileName, file));

            //로컬에 생성된 임시 파일 삭제
            file.delete();

            return s3Client.getUrl(bucketName, fileName).toString();
        } catch (AmazonServiceException e){
            throw new BusinessLogicException(ExceptionCode.ERROR_WHILE_UPLOADING_FILE_TO_S3);
        }
    }

    public void deleteFileFromS3Bucket(String fileName) {

        String bucketName = ""; // 실제 버킷 이름을 넣어야함. (s3에서 생성한 버킷이름)
        s3Client.deleteObject(bucketName, fileName);
    }

    private File convertMultiPartFileToFile(MultipartFile multipartFile){
        File file = new File(multipartFile.getOriginalFilename());
        try(FileOutputStream outputStream = new FileOutputStream(file)){
            outputStream.write(multipartFile.getBytes());
        } catch (IOException e){
            throw new BusinessLogicException(ExceptionCode.ERROR_WHILE_CONVERTING_MULTIPART_FILE_TO_FILE);
        }
        return file;
    }

}
