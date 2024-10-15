package com.webframework.common.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@SuperBuilder
public class FileVO extends BaseVO{
    private MultipartFile file;
    private Integer key;
    private Integer fileOrder;
    private String path;


}
