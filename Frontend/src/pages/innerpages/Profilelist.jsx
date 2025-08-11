import React from 'react'
import {useState,useEffect,useRef} from 'react'
import { CgProfile } from "react-icons/cg";
const Profilelist = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
  const clickanywhere = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  document.addEventListener("click", clickanywhere);
  return () => {
    document.removeEventListener("click", clickanywhere);
  };
}, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={()=>setOpen((prev)=>!prev)}
      >
        <CgProfile/>
      </button>
      {open && (
        <div className='absolute right-0 mt-2 bg-green-400 shadow-lg rounded-lg border border-gray-200'>
          <ul className='py-1'>
            <li>
              <button>
                Profile
              </button>
            </li>
            <li>
              <button>
                sitting
              </button>
            </li>
            <li>
              <button>
                logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profilelist
