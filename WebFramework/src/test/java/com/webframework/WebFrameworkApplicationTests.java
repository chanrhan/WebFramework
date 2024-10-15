package com.webframework;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

//@SpringBootTest
class WebFrameworkApplicationTests {
	private static final Logger log = LoggerFactory.getLogger(WebFrameworkApplicationTests.class);
//	@Autowired
	private SaleService saleService;

	@Test
	void contextLoads() throws IllegalAccessException {
//		insertData();
//		insertRandomData();
	}


	public void insertData(){
		SaleVO vo = SaleVO.builder()
				.userId("km1104rs")
				.provider(2)
				.sellerId("km1104rs")
				.internetPlan(1)
				.build();
		for(int i=0;i<4;++i){
			vo.setActvDt("2024-06-03");
			vo.setCustNm("it_"+i);
			vo.setCustGd(i % 3);
			vo.setCustTel(getRandomTel());
			vo.setCustCd(getRandomCustCd());
			saleService.insertSale(vo);
		}
	}

	public void insertRandomData(){
		String custNm = "terran_";
		Random random = new Random();

		LocalDate startDate = LocalDate.of(2024,6,1);
		LocalDate endDate = LocalDate.of(2024,7,31);



		for(int i=0;i<100; ++i){
			LocalDate actvDt = generateRandomDate(startDate, endDate);
			int deviceId = random.nextInt(4); // 0 ~ 3
			int udId = random.nextInt(3); // 0 ~ 2
			int ctActvTp = random.nextInt(3); // 0 ~ 2
			int istm = random.nextInt(7); // 0 ~ 6
			int totalCms = random.nextInt(900);
			int wtCms = random.nextInt(900);
			int provider = random.nextInt(3); // 0 ~ 2

			SaleVO vo = SaleVO.builder()
					.userId("km1104rs")
					.provider(provider)
					.actvDt(actvDt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
					.sellerId("km1104rs")
					.custNm(custNm+i)
					.custGd(100 % 3)
					.custTel(getRandomTel())
					.custCd(getRandomCustCd())
					.deviceId((i % 3 == 0) ? null : deviceId)
					.ctActvTp(ctActvTp)
					.ctIstm(istm)
					.totalCms(totalCms * 1000)
					.wtActvTp((i % 2 == 0) ? 0 : 1)
					.wtCms(wtCms * 1000)
					.sdId((i % 3 == 0) ? null : udId)
					.build();
			log.info("vo: {}", vo);
			saleService.insertSale(vo);
		}
	}

	public LocalDate generateRandomDate(LocalDate startDate, LocalDate endDate) {
		long startEpochDay = startDate.toEpochDay();
		long endEpochDay = endDate.toEpochDay();
		long randomEpochDay = ThreadLocalRandom.current().nextLong(startEpochDay, endEpochDay + 1);
		return LocalDate.ofEpochDay(randomEpochDay);
	}

	public String getRandomTel(){
		Random random = new Random();
		int tel1 = 1000 + random.nextInt(9000);
		int tel2 = 1000 + random.nextInt(9000);
		return "010-"+tel1+"-"+tel2;
	}

	public String getRandomCustCd(){
		Random random = new Random();
		int tmp = random.nextInt(5);

		if(tmp == 0){
			String randomCd1 = Integer.toString(10000 + random.nextInt(90000));
			String randomCd2 = Integer.toString(10000 + random.nextInt(90000));
			return randomCd1+randomCd2;
		}else{
			LocalDate startAge = LocalDate.of(1980,1,1);
			LocalDate endAge = LocalDate.of(2010,1,1);

			LocalDate birth = generateRandomDate(startAge, endAge);

			return birth.format(DateTimeFormatter.ofPattern("yyMMdd"));
		}



	}

}
