import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";


const useUser = () => {
    const {user} = useAuth();
    const axiosInstance = useAxios()

    const {data: isUser, isPending: isUserLoading} = useQuery({
        queryKey: [user?.email, 'isUser'],
        queryFn: async()=>{
            const res = await axiosInstance.get(`/users/user/${user.email}`)
            return res.data?.user;
        },
        enabled: !!user?.email
    })
    return [isUser, isUserLoading]
};

export default useUser;