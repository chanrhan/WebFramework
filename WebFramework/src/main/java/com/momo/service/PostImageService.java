package com.momo.service;

import com.momo.common.vo.PostImageVO;
import com.momo.mapper.PostImageMapper;
import com.momo.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PostImageService {
    private final PostImageMapper postImageMapper;

    public List<Map<String,Object>> getPostImageAll(int currShopId){
        return postImageMapper.getPostImageAll(currShopId);
    }

    public Integer insertPostImage( PostImageVO vo){
        return postImageMapper.insertPostImage(vo);
    }

    public int updatePostImage( PostImageVO vo){
        return postImageMapper.updatePostImage(vo);
    }

    public int deletePostImage(int currShopId, int pimgId){
        return postImageMapper.deletePostImage(currShopId, pimgId);
    }

    public int deleteAll(int currShopId){
        return postImageMapper.deleteAll(currShopId);
    }
}
