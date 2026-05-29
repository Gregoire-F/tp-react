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
        if (role === "ROLE_CLIENT_ADMIN") return false
        if (role === "DEVELOPER") return false
    }
}

export function useCanEdit (entityType:string){
    const {user} = useAppSelector (store => store.auth)
    const role = user?.user.roles[0]

    return (entity:any) => {
        // Les users ne peuvent rien éditer
        if (role === "ROLE_USER") return false

        // Le SUPER_ADMIN peut tout éditer
        if (role === "ROLE_SUPER_ADMIN") return true

        // Serveurs et Vm : seul SUPER_ADMIN a le droit d'éditer
        if (entityType === "server" || entityType === "vm"){
            return role === "ROLE_SUPER_ADMIN"
        }

        // CLIENT_ADMIN ne peut éditer que les users de sa propre équipe
        if (role === "ROLE_CLIENT_ADMIN"){
            if (entityType === "user"){
                return entity?.team?.id === user?.user?.team?.id;
            }
            return false
        }

        // ROLE_DEVELOPER : peut éditer serveurs et VMs, pas les users
        if (role === "ROLE_DEVELOPER"){
            if (entityType === "server" || entityType === "vm") return true;
            return false;
        }
    }
}