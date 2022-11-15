import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {

  const navigate = useNavigate()

  const [userName, setUserName] = useState<string>("")
  const [error, setError] = useState<string>()

  const createUser = (username: string) => {
      console.log(username)
      if(!username || username == "" || !username.trim()){
      localStorage.removeItem("ts-webchat")
      setError("You need to have a username to enter chat")
    } else{
      localStorage.setItem("ts-webchat", username)
      navigate("/chat")
    }
  }

  return (
    <div>


      <div className="selectName">
      <label>{error ? error : "Select a username to enter chat"} </label>
      <input className="inputSelectName" type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
      <button className="btn-sub2" onClick={(e) => createUser(userName)}>Enter chat</button>
      </div>
        
    </div>
  )
}
