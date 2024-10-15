package com.momo.study_private;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/study")
@RequiredArgsConstructor
public class PrivateStudyController {
    private final PrivateStudyService pss;

    @PostMapping("/node/add")
    public ResponseEntity<Boolean> insertNode(@RequestBody PrivateStudyVO vo){
        pss.insertNode(vo);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/node")
    public ResponseEntity<Map<String,Object>> getNodeDetail(@RequestParam int nodeId){
        return ResponseEntity.ok(pss.getNodeDetail(nodeId));
    }

    @GetMapping("/node/children")
    public ResponseEntity<List<Map<String,Object>>> getChildrenNodes(@RequestParam int parentId){
        return ResponseEntity.ok(pss.getChildrenNodes(parentId));
    }

    @PostMapping("/node/del")
    public ResponseEntity<Boolean> deleteNode(@RequestBody PrivateStudyVO vo){
        return ResponseEntity.ok(pss.deleteNode(vo.getNodeId()) > 0);
    }

    @PostMapping("/node")
    public ResponseEntity<Boolean> updateNode(@RequestBody PrivateStudyVO vo){
        return ResponseEntity.ok(pss.updateNode(vo) > 0);
    }

    @PostMapping("/node/move")
    public ResponseEntity<Boolean> updateParentNode(@RequestBody PrivateStudyVO vo){
        return ResponseEntity.ok(pss.updateParentNode(vo) > 0);
    }
}
