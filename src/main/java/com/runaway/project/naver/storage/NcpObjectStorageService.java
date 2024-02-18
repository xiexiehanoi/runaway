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

	public static final String BUCKET_NAME = "runaway";
	public static final String STORY_DIR_NAME = "runaway_story";

	AmazonS3 s3;
	
	public NcpObjectStorageService(NaverConfig naverConfig) {
		s3 = AmazonS3ClientBuilder.standard()
				.withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(
						naverConfig.getEndPoint(), naverConfig.getRegionName()))
				.withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(
						naverConfig.getAccessKey(), naverConfig.getSecretKey())))
				.build();
	}

	@Override
	public String uploadFile(String directoryPath, MultipartFile file) {
		return uploadFileWithUserId(directoryPath, file, "");
	}

	public String uploadFileWithUserId(String directoryPath, MultipartFile file, String userId) {
		if (file == null || file.isEmpty()) {
			System.out.println("[*] NcpObjectStorageService uploadFile file is Empty");
			return null;
		}
		System.out.println("uploadFile="+file.getOriginalFilename());

		try (InputStream fileIn = file.getInputStream()) {
			String uuid = UUID.randomUUID().toString();
			//년 월 일 시분_UUID의 절반만추출-이렇게 파일명을 수정해보자
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm");
			String filename = sdf.format(new Date()) + "_" + uuid.substring(0,10);
			if (!userId.isEmpty()) filename = userId + "_" + filename;

			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(file.getContentType());
			objectMetadata.setContentLength(file.getSize());

			PutObjectRequest objectRequest = new PutObjectRequest(
					BUCKET_NAME,
					directoryPath +"/"+ filename,
					fileIn,
					objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead);
			s3.putObject(objectRequest);

			return filename;
		} catch (Exception e) {
			throw new RuntimeException("file error", e);
		}
	}

	@Override
	public void deleteFile(String directoryPath, String fileName) {
		// TODO Auto-generated method stub
		String path=directoryPath+"/"+fileName;
		System.out.println("path="+path);
		boolean isfind=s3.doesObjectExist(BUCKET_NAME, path);
		System.out.println("isfind="+isfind);
		if(isfind) {
			s3.deleteObject(BUCKET_NAME, path);
			System.out.println(path+":delete!");
		}				
	}
}