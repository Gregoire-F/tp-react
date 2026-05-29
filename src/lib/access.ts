import { useAppSelector } from "../store/store";

export function useCanDelete (entityType:string){
    const {user} = useAppSelector(store => store.auth) 
    const role = user?.user.roles[0]

    return (entity:any) => {
        if (role === "ROLE_USER") return false
        if (role === "ROLE_SUPER_ADMIN") return true
        if (entityType === "server" || entityType === "vm"){
            return role === "ROLE_SUPER_ADMIN"
        }
    }
}

export function useCanEdit (entityType:string){
    const {user} = useAppSelector (store => store.auth)
    const role = user?.user.roles[0]

    return (entity:any) => {
        
    }
}