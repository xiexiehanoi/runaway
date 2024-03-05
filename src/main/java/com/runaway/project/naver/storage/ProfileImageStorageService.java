package com.runaway.project.naver.storage;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import java.lang.Override;

@Service
public class ProfileImageStorageService implements ObjectStorageService {

	public static final String BUCKET_NAME = "runaway";
	public static final String PROFILE_DIR_NAME = "profile_image";
	AmazonS3 s3;

	public ProfileImageStorageService(NaverConfig naverConfig) {
		System.out.println("NcpObjectStorageService 생성");
		s3 = AmazonS3ClientBuilder.standard()
				.withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(
						naverConfig.getEndPoint(), naverConfig.getRegionName()))
				.withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(
						naverConfig.getAccessKey(), naverConfig.getSecretKey())))
				.build();
	}

	@Override
	public String uploadFile(String directoryPath, MultipartFile file) {
		//		System.out.println("uploadFile="+file.getOriginalFilename());

		if (file.isEmpty()) {
			return null;
		}

		try (InputStream fileIn = file.getInputStream()) {
			String uuid = UUID.randomUUID().toString();
			// 연월일시분_UUID의 절반만 추출 - 이렇게 파일명을 수정해보자
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm_");
			String filename = sdf.format(new Date()) + uuid.substring(0, 10) + ".jpg";

			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(file.getContentType());

			PutObjectRequest objectRequest = new PutObjectRequest(
					BUCKET_NAME,
					directoryPath +"/"+ filename,
					fileIn,
					objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead);

			s3.putObject(objectRequest);

			//return s3.getUrl(bucketName, directoryPath + filename).toString();
			return filename;

		} catch (Exception e) {
			throw new RuntimeException("파일 업로드 오류", e);
		}
	}

	@Override
	public void deleteFile(String directoryPath, String fileName) {
		// TODO Auto-generated method stub
		String path=directoryPath+"/"+fileName;
		System.out.println("path="+path);
		//해당 버킷에 파일이 존재하면 true 반환
		boolean isfind=s3.doesObjectExist(BUCKET_NAME, path);
		System.out.println("isfind="+isfind);
		//존재할경우 삭제
		if(isfind) {
			s3.deleteObject(BUCKET_NAME, path);
			System.out.println(path+":삭제완료!");
		}
	}
}