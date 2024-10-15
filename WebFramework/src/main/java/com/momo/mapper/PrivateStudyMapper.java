package com.momo.mapper;

import com.momo.study_private.PrivateStudyVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface PrivateStudyMapper {
    void insertNode(PrivateStudyVO vo);
    int updateParentNode(PrivateStudyVO vo);
    int updateNode(PrivateStudyVO vo);
    List<Integer> deleteNode(int nodeId);
    boolean containChildren(int nodeId);
    List<Map<String ,Object>> getChildrenNodes(int parentId);
    Map<String, Object> getNodeDetail(int nodeId);
}
