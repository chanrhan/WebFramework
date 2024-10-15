package com.momo.study_private;

import com.momo.mapper.PrivateStudyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Stack;

@Service
@RequiredArgsConstructor
public class PrivateStudyService {
    private final PrivateStudyMapper privateStudyMapper;

    public void insertNode(PrivateStudyVO vo){
        privateStudyMapper.insertNode(vo);
    }

    public int updateNode(PrivateStudyVO vo){
        return privateStudyMapper.updateNode(vo);
    }

    public int updateParentNode(PrivateStudyVO vo){
        return privateStudyMapper.updateParentNode(vo);
    }

    public int deleteNode(int nodeId){
        List<Integer> d = null;
        Stack<Integer> deleteStack = new Stack<>();
        deleteStack.push(nodeId);

        int rst = 0;
        while (!deleteStack.isEmpty()){
            rst += 1;
            int id = deleteStack.pop();
            d = privateStudyMapper.deleteNode(id);
            if(d != null && !d.isEmpty()){
                deleteStack.addAll(d);
            }
        }

        return rst;
    }

    public List<Map<String, Object>> getChildrenNodes(int parentId){
        return privateStudyMapper.getChildrenNodes(parentId);
    }

    public Map<String,Object> getNodeDetail(int nodeId){
        return privateStudyMapper.getNodeDetail(nodeId);
    }

    public boolean containChildren(int nodeId){
        return privateStudyMapper.containChildren(nodeId);
    }
}
