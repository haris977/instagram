import React from 'react'
import {useState} from "react";
import {toast} from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { IoEyeSharp,IoEyeOffSharp  } from "react-icons/io5";
const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword]  = useState(false);
  const [formData, setFormData] = useState({
    userName : "",
    fullName : "",
    identifier: "",
    password : "",
    confirmPassword:"",
  })
  const handleOnChange = (e)=>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name] : [e.target.value],
    }));
  }
  const {userName,fullName,identifier,password,confirmPassword} = formData;
  const handleOnSubmit = (e)=>{
    e.preventDefault();
    if (formData.password!==formData.confirmPassword){
      toast.error("your passwrods doesn't match ");
      return ;
    }
    console.log(formData);
    dispatch(setSignUpData(formData));
    dispatch(sendOtpApi(formData.identifier,formData.userName,navigate));
    setFormData({
      userName :"",
      fullName:"",
      identifier:"",
      password:"",
      confirmPassword:"",
    });
  }
  return (
    <form onSubmit={handleOnSubmit} >
      <div className='flex flex-col justify-center space-y-3'>
        <div className='mx-3 flex flex-col items-center'>
          <input 
          required
          type="text" name='username' value={formData.userName} onChange={handleOnChange}
            placeholder = "username" className='w-full mt-2'/>
        </div>
        <div className='mx-3 flex flex-col items-center'>
          <input required type="text" name='fullName'
          value= {formData.fullName} onChange={handleOnChange} 
          placeholder="full name"
          className='w-full mt-2' />
        </div>
        <div className='mx-3 flex flex-col items-center'>
          <input type="text" name='identifier' value={formData.identifier}
            onChange={handleOnChange}
            placeholder="identifer"
          className='w-full mt-2' />
        </div>
        <div className='mx-3 flex flex-col items-center'>
          <input type="text" name='password' value= {formData.password} 
            onChange={handleOnChange}
            placeholder = "password"
          className='w-full mt-2' />
          <button type='button' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
            className='cursor-pointer absolute '
          >
            {showConfirmPassword?<IoEyeSharp/>:<IoEyeOffSharp/>}
          </button>
        </div>
        
        <div className='mx-3 flex flex-col items-center'>
          <input type="text" name='confirmPassword' value={formData.confirmPassword}
            OnChange={handleOnChange}
          className='w-full mt-2' />
          <button type='button' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
            className='cursor-pointer absolute '
          >
            {showConfirmPassword?<IoEyeSharp/>:<IoEyeOffSharp/>}
          </button>
        </div>
      </div>
      <div>
        <button type='submit' className='w-full mx-auto mt-4'>
          Create Account
        </button>
        <button className='flex items-center '>Continue With Google</button>        
      </div>
    </form>

  )
}

export default SignUpForm
