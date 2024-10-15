import {AxiosApiWithAccessToken} from "./ApiCommon";

function TodoApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        getTodoForCalendar: async (date)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/todo?date=${date}`,accessToken)
        },
        getTodoDetail: async (date)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/todo/detail?date=${date}`,accessToken)
        },
        updateTodoContent: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/todo/detail/content', body, accessToken)
        },
        updateTodoColor: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/todo/detail/color', body, accessToken)
        },
        updateTodoChecked: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/todo/detail/checked', body, accessToken)
        },
        addTodo: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/todo/detail/add', body, accessToken)
        },
        deleteTodo: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/todo/detail/del', body, accessToken)
        }
    }
}

export default TodoApi;

