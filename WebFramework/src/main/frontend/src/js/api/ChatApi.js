import {AxiosApiWithAccessToken} from "./ApiCommon";

function ChatApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    return {
        getOnlineUser : async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/chat/user/online', accessToken);
        },
        createChatRoom : async (roomName)=>{
            return await axiosApiWithAccessToken.post('/api/v1/chat/room', {
                room_nm: roomName
            }, accessToken);
        },
        getChatRoom : async (roomName)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/chat/room?room_nm=${roomName}`, accessToken);
        },
        getChatRoomDetail : async (roomId)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/chat/room/${roomId}/detail`, accessToken);
        },
        getChatRoomHeadCount : async (roomId)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/chat/room/${roomId}/headcount`,accessToken);
        },
        getChatRoomUserList : async (roomId)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/chat/room/${roomId}/user`,accessToken);
        },
        getInvitableUserList : async (keyword)=>{
            return await axiosApiWithAccessToken.post('/api/v1/chat/list/user/invitable',{
                keyword: keyword
            }, accessToken);
        },
        inviteUser : async (client, roomId, userId)=>{
            client.current.publish({
                destination: `/pub/chat/room/invite/${roomId}`,
                body: JSON.stringify({
                    user_id: userId
                })
            });
        },
        announce : async (client, roomId, data)=>{
            client.current.publish({
                destination: `/pub/chat/room/${roomId}/announce`,
                body: JSON.stringify(data)
            });
        },
        getAnnouncement : async (roomId)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/chat/room/${roomId}/ann`, accessToken);
        },
        sendChat : (client, roomId, data)=>{
            client.current.publish({
                destination: `/pub/chat/send/${roomId}`,
                body: JSON.stringify(data)
            })
        },
        readChatRoom : (client, roomId, userId)=>{
            client.current.publish({
                destination: `/pub/chat/room/${roomId}/read`,
                body: JSON.stringify({
                    user_id: userId
                })
            });
        },
        getChatLog : async (roomId, keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/chat/room/${roomId}/log?keyword=${keyword}`, {
                room_id: roomId
            }, accessToken);
        },
        sendChatEmo : async (client, roomId, data)=>{
            client.current.publish({
                destination: `/pub/chat/emo/${roomId}`,
                body: JSON.stringify(data)
            });
        }

    }
}

export default ChatApi;