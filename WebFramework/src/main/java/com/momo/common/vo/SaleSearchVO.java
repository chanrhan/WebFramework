package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class SaleSearchVO extends BaseVO {
    private String userId;
    private Integer saleId;
    private Integer category;
    private Integer currShopId;

//    private String keyword;
//    private String keydate;
//    private Integer order;
//    private boolean asc = false;
    private Boolean notDone;
//    private int[] columns = {1,2,3,4,5,6,7,8,9};
    private SaleSearchFilter[] filters;

//    private Integer[] columns;

    @Data
    @NoArgsConstructor
    private static class SaleSearchFilter{
        private boolean and = false;
        private Integer type ;
        private Integer option;
        private Object target;
    }



    private static String[] TYPES = {
      "device_id","sd_id","ct_actv_plan"
    };

    private static String[] OPTIONS = {
            " = ",
            " != ",
            " is null ",
            " is not null "
    };
    public String getAsc(){
        return asc ? "asc":"desc";
    }

    private String generateClause(SaleSearchFilter filter){
        StringBuilder sb = new StringBuilder(" ( ");
        switch (filter.type){
            case 0: // 모델명
                sb.append("device_nm").append(OPTIONS[filter.option]);
                if(filter.option < 2 ){
                    sb.append("'").append(filter.target).append("'");
                }
                sb.append(" or ").append("device_cd").append(OPTIONS[filter.option])
                        .append("'").append(filter.target).append("'");
                break;
            case 1: // 메인구분
                switch (filter.target.toString()){
                    case "0": // 무선
                        sb.append("ct is ").append((filter.option == 0 || filter.option == 3) ? "true":"false");
                        break;
                    case "1": // 유선
                        sb.append("wt is ").append((filter.option == 0 || filter.option == 3) ? "true":"false");
                        break;
                    case "2": // 세컨
                        sb.append("sd is ").append((filter.option == 0 || filter.option == 3) ? "true":"false");
                        break;
                }
                break;
            case 2: // 담당자
                sb.append("seller_nm").append(OPTIONS[filter.option]);
                if(filter.option < 2){
                    sb.append("'").append(filter.target).append("'");
                }
                break;
            case 3:// 개통요금제
                sb.append("ct_actv_plan_nm").append(OPTIONS[filter.option]);
                if(filter.option < 2){
                    sb.append("'").append(filter.target).append("'");
                }
                break;
            case 4: // 하향요금제
                sb.append("ct_dec_plan_nm").append(OPTIONS[filter.option]);
                if(filter.option < 2){
                    sb.append("'").append(filter.target).append("'");
                }
                break;
            case 5: // 개통유형
                sb.append("ct_actv_tp").append(OPTIONS[filter.option]);
                if(filter.option < 2){
                    sb.append("'").append(filter.target).append("'");
                }
                break;
            case 6: // 개통구분
                sb.append("ct_actv_div").append(OPTIONS[filter.option]);
                if(filter.option < 2){
                    sb.append("'").append(filter.target).append("'");
                }
                break;
            case 7: // 할부
                sb.append("ct_istm").append(OPTIONS[filter.option]);
                if(filter.option < 2){
                    sb.append("'").append(filter.target).append("'");
                }
                break;
            case 8: // 용량
                sb.append("device_stor").append(OPTIONS[filter.option]);
                if(filter.option < 2){
                    sb.append("'").append(filter.target).append("'");
                }
                break;
            default:
                break;
        }
        sb.append(" ) ");
        return sb.toString();
    }



    public String getFilters(){
        if(filters == null || filters.length == 0){
            return null;
        }
        StringBuilder sb = new StringBuilder();
        sb.append(generateClause(filters[0]));
        for(int i=1;i<filters.length;++i){
            sb.append(filters[i].and ? " and " : " or ")
                    .append(generateClause(filters[i])).append(" ");
        }
        sb.append(" and ");

        return sb.toString();
    }
}
