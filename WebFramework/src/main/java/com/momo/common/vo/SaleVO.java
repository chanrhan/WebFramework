package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class SaleVO extends BaseVO {
//	private String userId;
	private Integer saleId; // 판매일보 번호
	private Integer shopId; // 매장 코드
	private Integer supId;
	private Integer addId;

//	private Integer currShopId;

	// 고객 정보
	private String custNm; // 고객 이름
	private Integer custGd; // 고객 성별 (Gender)
	private String custTel; // 고객 전화번호
	private String custCd; // 고객 식별번호 (개인: 생년월일, 법인: 사업자번호)

	// 개통 정보
	private Integer provider; // 통신사
	private String  actvDt; // 개통일자 (Activate)
	private Integer deviceId; // 핸드폰 모델명 (Model)
	private Integer deviceStor; // 핸드폰 용량 (Storage)
	private Integer ctIstm; // 무선 할부 (Installment)
	private Integer ctActvDiv; // 무선 개통 구분 (Division)
	private Integer ctActvTp; // 무선 개통 유형 (Type)
	private Integer ctActvPlan; // 무선 개통 요금제
	private Integer ctDecPlan; // 무선 하향 요금제
	private Integer ctCms; // 무선 판매 수수료 (Cordless Telephone Commission)

	// 중고폰
	private List<SaleUsedDeviceVO> udList;

	// 세컨
	private Integer sdId; // 세컨 모델

	// 유선
	private Integer wtActvTp; // 유선 구분
	private Integer wtCms; // 유선 판매 수수료
	private Integer internetPlan; // 인터넷 개통 요금제 (Internet)
	private Integer tvPlan; // TV 개통 요금제

	// 부가서비스
	private Integer exsvcId; // 부가서비스 아이디

	// 결합
	private Integer combSt; // 결합 진행현황
	private Integer combTp; // 결합 유형
	private String combMemo; // 결합 관련 메모

	// 카드
	private List<SaleCardVO> cardList;

	// 체크박스
	private boolean friend = false; // 지인
	private boolean family = false; // 가족 등록

	private String  sellerId; // 담당 매니저(판매자) 아이디
	// 토탈
	private Integer totalCms; // 총 판매금액

	// 파일
	private List<String> files; // 파일들
//	private String docs;
	private List<Integer> fileOrders; // 파일 키
//	private List<Integer> deleteFiles; // 삭제 파일 키

	// 기타
	private String saleMemo; // 비고


	// 지원
	private List<SaleSupportVO> supList;

	// 추가
	private List<SaleAddVO> addList;

	// 고객 약속
	private List<SalePromiseVO> pmList;

	// 예약 문자
	private List<ReserveMessageVO> rsvMsgList;

	private Integer udId;
	private Integer amount;

	private Integer pmId;
	private Integer cardId;
	private Integer combId;

	private Integer category;
	private Integer state;
}
