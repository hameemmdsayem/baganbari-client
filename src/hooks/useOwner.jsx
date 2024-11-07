import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useOwner = () => {
    const {user} = useAuth();
    const axiosInstance = useAxios()

    const {data: isOwner, isPending: isOwnerLoading} = useQuery({
        queryKey: [user?.email, 'isOwner'],
        queryFn: async()=>{
            const res = await axiosInstance.get(`/users/owner/${user.email}`)
            return res.data?.owner;
        },
        enabled: !!user?.email
    })
    return [isOwner, isOwnerLoading]
};

export default useOwner;