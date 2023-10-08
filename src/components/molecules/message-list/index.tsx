import { useEffect } from "react";
import MessageGroup from "../../atoms/message-group";
import api from "../../../config/axios";

const MessageList = () => {
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await api.get("/api/v1/common/message-list?studentId=SE172220");
    //             console.log(response);
                
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchUserData();
    // }, []);

    return (
        <div className="w-1/3 border border-gray-200 rounded-lg overflow-y-auto h-fit max-h-full">
            <MessageGroup
                title="NET1700 - Rainbow Dragon"
                message="alo alo alo alo alo alo Danzxcvzxvzxvzxvxzvzxvzxcvzxcvxzvczvxdv"
                date={new Date(2023, 11, 19)}
                status={false} />
            <MessageGroup
                title="NET1700 - Rainbow Dragon"
                message="alo alo alo alo alo alo Danzxcvzxvzxvzxvxzvzxvzxcvzxcvxzvczvxdv"
                date={new Date(2023, 11, 19)}
                status={false} />
            <MessageGroup
                title="NET1700 - Rainbow Dragon"
                message="alo alo alo alo alo alo Danzxcvzxvzxvzxvxzvzxvzxcvzxcvxzvczvxdv"
                date={new Date(2023, 11, 19)}
                status={false} />

            <MessageGroup
                title="NET1700 - Rainbow Pig"
                message="alo alo alo alo alo alo Danzxcvzxvzxvzxvxzvzxvzxcvzxcvxzvczvxdv"
                date={new Date(2023, 11, 19)}
                status={true} />
            <MessageGroup
                title="NET1700 - Rainbow Pig"
                message="alo alo alo alo alo alo Danzxcvzxvzxvzxvxzvzxvzxcvzxcvxzvczvxdv"
                date={new Date(2023, 11, 19)}
                status={true} />
            <MessageGroup
                title="NET1700 - Rainbow Pig"
                message="alo alo alo alo alo alo Danzxcvzxvzxvzxvxzvzxvzxcvzxcvxzvczvxdv"
                date={new Date(2023, 11, 19)}
                status={true} />
            <MessageGroup
                title="NET1700 - Rainbow Pig"
                message="alo alo alo alo alo alo Danzxcvzxvzxvzxvxzvzxvzxcvzxcvxzvczvxdv"
                date={new Date(2023, 11, 19)}
                status={true} />
            <MessageGroup
                title="NET1700 - Rainbow Pig"
                message="alo alo alo alo alo alo Danzxcvzxvzxvzxvxzvzxvzxcvzxcvxzvczvxdv"
                date={new Date(2023, 11, 19)}
                status={true} />
            <MessageGroup
                title="NET1700 - Rainbow Pig"
                message="alo alo alo alo alo alo Danzxcvzxvzxvzxvxzvzxvzxcvzxcvxzvczvxdv"
                date={new Date(2023, 11, 19)}
                status={true} />
            <MessageGroup
                title="NET1700 - Rainbow Pig"
                message="alo alo alo alo alo alo Danzxcvzxvzxvzxvxzvzxvzxcvzxcvxzvczvxdv"
                date={new Date(2023, 11, 19)}
                status={true} />
        </div>
    )
}

export default MessageList;