package com.webframework.common.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Map;

@Data
@SuperBuilder
@NoArgsConstructor
public class SearchVO {
	// Query String Generataion
	private Integer             page;
	private String target;
	private Map<String, Object> select;
	private Map<String, Object> search;

	private String  order; // 정렬
	private String  asc = "asc"; // false: asc(오름차순), true: desc(내림차순)
	private Integer offset;
	private Integer limit;

	public String getProp() {
		StringBuilder sb = new StringBuilder();
		if (order != null && !order.equals("")) {
			sb.append("order by ").append(order).append(" ").append(asc);
		}
		if (offset != null && limit != null) {
			sb.append("limit ").append(offset).append(" ").append(limit);
		}
		return sb.toString();
	}

	public String getAndSelect() {
		StringBuilder sb = new StringBuilder();
		if (select != null && !select.isEmpty()) {
			select.forEach((key, value) -> {
				if (value == null || value.equals("")) {
					return;
				}
				sb.append(key).append("=").append("'").append(value).append("'").append(" and ");
			});
		}
		sb.append(" 1 = 1");

		return sb.toString();
	}

	public String getOrSelect() {
		StringBuilder sb = new StringBuilder();
		if (select != null && !select.isEmpty()) {
			sb.append("(");
			int[] size = {0};
			select.forEach((key, value) -> {
				if (value == null || value.equals("")) {
					return;
				}
				sb.append(key).append("=").append("'").append(value).append("'");
				size[0]++;
				if (size[0] == select.size()) {
					sb.append(")");
					sb.append(" and");
				}
				else {
					sb.append(" or ");
				}
			});

		}
		sb.append(" 1 = 1");

		return sb.toString();
	}

	public String getAndSearch() {
		StringBuilder sb = new StringBuilder();
		if (search != null && !search.isEmpty()) {
			search.forEach((key, value) -> {
				sb.append(key).append(" like ").append("'%").append(value).append("%'").append(" and ");
			});
		}
		sb.append(" 1 = 1");

		return sb.toString();
	}

	public String getOrSearch() {
		StringBuilder sb = new StringBuilder();
		if (search != null && !search.isEmpty()) {
			sb.append("(");
			final int[] size = {0};
			search.forEach((key, value) -> {
				sb.append(key).append(" like ").append("'%").append(value).append("%'");
				size[0]++;
				if (size[0] == search.size()) {
					sb.append(")");
					sb.append(" and");
				}
				else {
					sb.append(" or ");
				}
			});
		}
		sb.append(" 1 = 1");

		return sb.toString();
	}
}
