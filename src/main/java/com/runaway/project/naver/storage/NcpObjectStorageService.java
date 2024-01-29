package com.runaway.project.naver.storage;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class NcpObjectStorageService implements ObjectStorageService {
	
	AmazonS3 s3;
	
	public NcpObjectStorageService(NaverConfig naverConfig) {
		System.out.println("NcpObjectStorageService");
		s3 = AmazonS3ClientBuilder.standard()
				.withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(
						naverConfig.getEndPoint(), naverConfig.getRegionName()))
				.withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(
						naverConfig.getAccessKey(), naverConfig.getSecretKey())))
				.build();
	}

	@Override
	public String uploadFile(String bucketName, String directoryPath, MultipartFile file) {
		System.out.println("uploadFile="+file.getOriginalFilename());

		if (file.isEmpty()) {
			return null;
		}

		try (InputStream fileIn = file.getInputStream()) {
			String uuid = UUID.randomUUID().toString();
			//년 월 일 시분_UUID의 절반만추출-이렇게 파일명을 수정해보자
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm");
			String filename = sdf.format(new Date())+uuid.substring(0,10);

			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(file.getContentType());

			PutObjectRequest objectRequest = new PutObjectRequest(
					bucketName,
					directoryPath +"/"+ filename,
					fileIn,
					objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead);

			s3.putObject(objectRequest);
			
			//return s3.getUrl(bucketName, directoryPath + filename).toString();
			return filename;

		} catch (Exception e) {
			throw new RuntimeException("file error", e);
		}
	}

	@Override
	public void deleteFile(String bucketName, String directoryPath, String fileName) {
		// TODO Auto-generated method stub
		String path=directoryPath+"/"+fileName;
		System.out.println("path="+path);
		boolean isfind=s3.doesObjectExist(bucketName, path);
		System.out.println("isfind="+isfind);
		if(isfind) {
			s3.deleteObject(bucketName, path);
			System.out.println(path+":delete!");
		}				
	}
}