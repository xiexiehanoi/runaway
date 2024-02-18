package com.runaway.project.naver.storage;

import org.springframework.web.multipart.MultipartFile;

public interface ObjectStorageService {
	public String uploadFile(String directoryPath, MultipartFile file);
	public void deleteFile(String directoryPath, String fileName);
}
