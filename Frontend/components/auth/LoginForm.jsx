import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {loginApi} from '../../apis/authAPI';
import {useNavigate} from 'react-router-dom';
import { IoEyeSharp,IoEyeOffSharp  } from "react-icons/io5";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {user} = useSelector((state)=>state.profile);
  const handleOnChange = (e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  } 
  const handleOnSubmit = (e)=>{
    e.preventDefault();
    dispatch(loginApi(FormData.identifier,FormData.password,navigate));
  }

  return (
    <form>
      <div className='flex flex-col justify-center'>
        <div className='mx-3 flex flex-col items-center'><input  required type="text"
          name='identifier' value={FormData.identifier} onChange={handleOnChange} 
          placeholder='your mobile number or Email id ' 
          className='w-full mt-2 '/>
          </div>
        <div className='mx-3 flex flex-col items-center'><input  required type={showPassword==true?"text":"password"}
          name='password' value={FormData.password} onChange={handleOnChange} placeholder='password' 
          className='w-full mt-2'/>
        </div>
      </div>
      <div className='mx-3'>
        <button type='submit' className='w-full m-auto '>
          Login to Continue
        </button>
      </div>
    </form>
  )
}

export default LoginForm
