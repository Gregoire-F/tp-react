import { useEffect } from 'react';
import { useNavigate } from 'react-router';
export interface ProtectedRoutesPropsI {
    token: string;
}

export default function Login({token}: ProtectedRoutesPropsI){
    const navigate = useNavigate
    useEffect (() => {
        fetch('http://localhost:5173/login', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {Authorization : token}
        })
        .then(res => {if (!res.ok) navigate(); return res.json()})
    }, [])

  return (
    <form>
      <input type="text" placeholder="Log in" />
      <input type="password" placeholder="Password" />
      <button type="submit">Log in</button>
    </form>
  )
}
