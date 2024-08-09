import React, { useRef } from 'react'
import Select from 'react-select';
import { BACKEND_URL } from '../utils/constants';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';
const CreateTaskPopup = ({setModal}) => {
    const cookies = new Cookies(null, { path: '/'});
    let token=cookies.get('token')
    let userId=cookies.get('userId')
    const navigate=useNavigate()

    const title=useRef(null)
    const description=useRef(null)
    const assignTo=useRef(null)
    const priority=useRef(null)
    const projectId=useRef(null)
    const deadLine=useRef(null)
    const fileInputRef=useRef(null)
    // const assigned

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('title', title.current.value);
        formDataToSend.append('description', description.current.value);
        formDataToSend.append('assignedTo',assignTo.current.value)
        formDataToSend.append('subtask',{})
        formDataToSend.append('projectId',projectId.current.value)
        formDataToSend.append('deadline',deadLine.current.value)
        formDataToSend.append('priority',priority.current.value)
    
        const files = fileInputRef.current.files;
        for (let i = 0; i < files.length; i++) {
          formDataToSend.append('attachments', files[i]);
        }

        console.log('This is form data',formDataToSend)
    
        try {
          const response = await fetch(BACKEND_URL+'/admin/create-task', {
            method: 'POST',
            body: formDataToSend,
            headers:{
              'authorization':token
            }
          });

          const data=await data.json()
          // navigate(0)
          close();
        } catch (error) {
          console.error('Error uploading files:', error);
          // Handle error
        }
      };

      const close=()=>{

        window.location.reload()
        navigate(0)
        setModal(false)
        description.current.value=""
      }


  return (
    <form className='absolute w-1/2 border border-slate-300 bg-white left-[50%] top-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] p-2 shadow-lg rounded-md flex flex-col gap-2'>
        <button className='m-0 p-0 text-left' onClick={()=>setModal(false)}>x</button>


        <input type="text" name='title' placeholder='Enter title' className='p-2 border border-slate-300 rounded-md shadow-sm m-1' ref={title}/>

        <textarea name="description" id="description" cols={5} rows={5} className='border border-slate-300 shadow-sm rounded-md overflow-y-scroll p-2' ref={description} placeholder='Comments'></textarea>
        
        <input type="text" name='assign' placeholder='Assign To' className='p-2 border border-slate-300 rounded-md shadow-sm m-1' ref={assignTo}/>
        
         {/* to be done later */}
        {/* <select name="projects" id="projects" className='p-2 border border-slate-300 rounded-md shadow-sm m-1'>
            <option value="sample">
                Vision
            </option>
        </select> */}

 

        <select name="priority" id="priority" className='p-2 border border-slate-300 rounded-md shadow-sm m-1' ref={priority}>
            <option value="normal">
                Normal
            </option>
            <option value="moderate">
                Moderate
            </option>
            <option value="critical">
                Critical
            </option>
        </select>

        <input type="text" placeholder='Enter ProjectId' name='projectId' className='p-2 border border-slate-300 rounded-md shadow-sm m-1' ref={projectId}/>
        <input type="text" placeholder='Enter Date YYYY-MM-DD' name='date' className='p-2 border border-slate-300 rounded-md shadow-sm m-1' ref={deadLine}/>

        <input type="file" multiple className='p-2 border border-slate-300 rounded-md shadow-sm m-1' ref={fileInputRef} name='file' />

        <button className='bg-slate-900 p-2 text-white rounded-md' onClick={handleSubmit}>SUBMIT</button>
    </form>
  )
}

export default CreateTaskPopup