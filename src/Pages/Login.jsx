import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {auth} from "../Firebase";
import {signInWithEmailAndPassword} from "firebase/auth";

function Login() {
  const navigate = useNavigate();

const [submitBtnDis,setDis] = useState(false);
const [err,setErr] = useState(null)
const [formDet, setForm] = useState({
  email:"",
  password:""
  })

const handleForm = (e) =>{
  // console.log(e.target)
  e.preventDefault()
  let {name,value} = e.target;
  // console.log(value)
  setForm((preVal)=>{
    return {...preVal,[name]:value}
  })
}
// console.log(formDet.username)
// console.log(formDet.email)
// console.log(formDet.password)

const submitForm = async (e) =>{
  e.preventDefault()
  console.log("form submitted")
  let {email,password} = formDet;
  setDis(true)
  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    setErr(null)
    setForm({
      email:"",
      password:""
    })
    navigate('/')
  })
  .catch((error) => {
    setDis(false)
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    setErr(errorMessage)
    // ..
  });
}
  return (
    <div className="signup">
        <div className="signup-wrap">
            <form onSubmit={submitForm} >
                <span className="logo">React Chat</span>
                <span className='title'>Log in</span>
                <input type="email" name='email' placeholder='Email' value={formDet.email} onChange={handleForm} required autoComplete='off'/>
                <input type="password" name='password' placeholder='Password' value={formDet.password} onChange={handleForm} required autoComplete='off'/>
                {err && <span style={{color:'red'}}>{err}</span>}
                <button type='submit' disabled={submitBtnDis}>Log In</button>
                <span>Don't have an account? <Link to={'/signup'}>Sign Up</Link></span>
            </form>
        </div>
    </div>
  )
}

export default Login;