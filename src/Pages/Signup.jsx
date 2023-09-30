import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../Firebase";
import InsertEmoticonSharpIcon from '@mui/icons-material/InsertEmoticonSharp';
import { Link, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://frceuzxqwexmrbfvqjvm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyY2V1enhxd2V4bXJiZnZxanZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2MjQ3MTQsImV4cCI6MjAwODIwMDcxNH0.a8388biNDvaNsES_tMKi38HDzWi8oHVf0oZsjuqgFwo'
const supabase = createClient(supabaseUrl, supabaseKey)

function Signup() {
  const navigate = useNavigate();

  const [submitBtnDis, setDis] = useState(false);
  const [err, setErr] = useState(null);
  const [formDet, setForm] = useState({
    username: "",
    email: "",
    password: "",
    image: null
  });

  const handleForm = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setForm((preVal) => {
      return { ...preVal, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((preVal) => {
      return { ...preVal, image: file };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    let { email, password, image, username } = formDet;
    setDis(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      // console.log(user)
      const {data,error} = await supabase.storage
      .from('profile')
      .upload('public/'+username+'.jpg',image);
      let info = data;
      if (!error) {
        let {path} = info;
        console.log(path)
        const downloadURL = `https://frceuzxqwexmrbfvqjvm.supabase.co/storage/v1/object/public/profile/${path}`
        await updateProfile(res.user, {
          displayName: username,
          photoURL: downloadURL
        });
        // console.log(res.user)
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: username,
          email,
          photoURL: downloadURL
        });
        await setDoc(doc(db, "userChats", res.user.uid), {})
      
      setErr(null);
      setForm({
        username: "",
        email: "",
        password: "",
        image: null
      });
      navigate('/');
    }
    } catch (error) {
      console.log(error.message);
      setErr(error.message);
      setDis(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup-wrap">
        <form onSubmit={submitForm}>
          <span className="logo">React Chat</span>
          <span className='title'>Register</span>
          <input type="text" name='username' placeholder='Username' value={formDet.username} onChange={handleForm} required autoComplete='off' />
          <input type="email" name='email' placeholder='Email' value={formDet.email} onChange={handleForm} required autoComplete='off' />
          <input type="password" name='password' placeholder='Password' value={formDet.password} onChange={handleForm} required autoComplete='off' />
          <label htmlFor="file" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'blueviolet', cursor: 'pointer' }}>
            <span><InsertEmoticonSharpIcon /></span> Add your avatar
          </label>
          <input type="file" id='file' style={{ display: 'none' }} onChange={handleFileChange} />
          {err && <span style={{ color: 'red' }}>{err}</span>}
          <button type='submit' disabled={submitBtnDis}>Sign Up</button>
          <span>Already have an account? <Link to={'/login'}>Log In</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
