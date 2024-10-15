package com.momo.common.util;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;

import java.util.List;

@Data
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "NewAddressListResponse")
public class AddressAreaApiResponse {
	@XmlElement(name = "cmmMsgHeader")
	private CmmMsgHeader cmmMsgHeader;

	@XmlElement(name = "newAddressListAreaCdSearchAll")
	private List<NewAddressListAreaCdSearchAll> newAddressListAreaCdSearchAll;

	@Data
	@XmlRootElement(name = "cmmMsgHeader")
	private static class CmmMsgHeader{
		private String requestMsgId;
		private String responseMsgId;
		private String responseTime;
		private String successYN;
		private String returnCode;
		private String errMsg;
		private String totalCount;
		private String countPerPage;
		private String totalPage;
		private String currentPage;
	}

	@Data
	@XmlRootElement(name = "newAddressListAreaCdSearchAll")
	private static class NewAddressListAreaCdSearchAll{
		private String zipNo;
		private String lnmAdres;
		private String rnAdres;
	}

	public static AddressAreaApiResponse emptyResponse(){
		return new AddressAreaApiResponse();
	}

}
