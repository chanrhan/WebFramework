package com.momo.service;

import com.momo.common.vo.TodoVO;
import com.momo.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoMapper todoMapper;

    public List<Map<String,Object>> getTodoDetail(TodoVO vo){
        return todoMapper.getTodoDetail(vo);
    }

    public List<Integer> getTodoForCalendar(TodoVO vo){
        return todoMapper.getTodoForCalendar(vo);
    }

    public int updateTodoContent(TodoVO vo){
        return todoMapper.updateTodoContent(vo);
    }

    public int updateTodoColor(TodoVO vo){
        return todoMapper.updateTodoColor(vo);
    }

    public int updateTodoChecked(TodoVO vo){
        return todoMapper.updateTodoChecked(vo);
    }

    public void insertTodo(TodoVO vo){
        todoMapper.insertTodo(vo);
    }

    public int deleteTodo(TodoVO vo){
        return todoMapper.deleteTodo(vo);
    }
}
