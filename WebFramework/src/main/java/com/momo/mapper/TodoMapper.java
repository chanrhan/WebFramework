package com.momo.mapper;

import com.momo.common.vo.TodoVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TodoMapper {
    public List<Map<String,Object>> getTodoDetail(TodoVO vo);
    public List<Integer> getTodoForCalendar(TodoVO vo);

    public int updateTodoContent(TodoVO vo);
    public int updateTodoColor(TodoVO vo);
    public int updateTodoChecked(TodoVO vo);

    public void insertTodo(TodoVO vo);

    public int deleteTodo(TodoVO vo);
}
