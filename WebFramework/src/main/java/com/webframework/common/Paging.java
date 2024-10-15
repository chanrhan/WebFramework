package com.webframework.common;

import lombok.Data;

import java.util.List;

@Data
public class Paging<T> {
	private int pageNumber; // 페이지 번호의 시작은 1부터이다.
	private int size;

	private List<T> records;
	private int totalRecordCount;

	public Paging(){
		this(1, 10);
	}

	public Paging(int pageNumber, int size){
		this.pageNumber=pageNumber;
		this.size=size;
	}

	public int getOffset(){
		return (pageNumber - 1) * size;
	}

	public int getTotalPageCount(){
		return (totalRecordCount / size) + 1;
	}

	public boolean hasPrev(){
		return getOffset() > 0;
	}

	public boolean hasNext(){
		return getOffset() + size < totalRecordCount;
	}
}
