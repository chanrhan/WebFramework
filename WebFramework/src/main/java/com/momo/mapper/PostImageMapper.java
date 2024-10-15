package com.momo.mapper;

import com.momo.common.vo.PostImageVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface PostImageMapper {
    public List<Map<String,Object>> getPostImageAll(int currShopId);

    public Integer insertPostImage( PostImageVO vo);
    public int updatePostImage( PostImageVO vo);
    public int deletePostImage(int currShopId, int pimgId);
    public int deleteAll(int currShopId);
}
