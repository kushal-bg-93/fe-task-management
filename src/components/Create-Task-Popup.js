import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import { BACKEND_URL } from '../utils/constants';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '../utils/store';
import { setAutoSuggestions } from '../utils/userAutoSuggestionSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import moment from 'moment';


const CreateTaskPopup = ({setModal}) => {
    const cookies = new Cookies(null, { path: '/'});
    const [searchText,setSearchText]=useState(null)
    const autoSuggestionResults=useSelector(store=>store?.autoSuggestionUser?.result)
    const [searchResults,setSearchResults]=useState(null)
    const [searchResultStatus,setSearchResultStatus]=useState(false)
    const [assignedTo,setAssignedTo]=useState([])
    const [searchSelectList,setSearchSelectList]=useState([])
    const [projectResults,setProjectResults]=useState(null)
    const [date, setDate] = useState(new Date());
    const [calendarStatus,setCalendarStatus]=useState(false)

    let token=cookies.get('token')
    let userId=cookies.get('userId')
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const title=useRef(null)
    const description=useRef(null)
    const assignTo=useRef(null)
    const priority=useRef(null)
    const projectId=useRef(null)
    const deadLine=useRef(null)
    const fileInputRef=useRef(null)

    // console.log('This is assignedTo',assignedTo)

    const searchSuggestionClickHandle=(element)=>{
      if(!assignedTo.some(item=>item==element?._id)){
        setAssignedTo([...assignedTo,element?._id])
        setSearchText("")
        setSearchSelectList([{_id:element?._id,name:element?.name},...searchSelectList])

      }
    }

    const fetchProjects=async ()=>{
      let data=await fetch(BACKEND_URL+"/admin/view-project",{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'authorization':token
        }
      })

      data=await data.json()

      setProjectResults(data?.result?.data)
    }

    useEffect(()=>{
      let timer=setTimeout(()=>{getAutoSuggestion()},300)
      
      return ()=>clearTimeout(timer)
  },[searchText,searchResults,autoSuggestionResults])

  useEffect(()=>{
    fetchProjects()

  },[])

  async function getAutoSuggestion(){
    if(searchText){
        if(!autoSuggestionResults[searchText]){
            let searchRes={}
            
            // console.log('url>>',searchText)
            
            let data=await fetch(BACKEND_URL+'/admin/search-user?search='+searchText,{
              method:'GET',
              headers:{
                'Content-Type':'application/json',
                'authorization':token
              },
            })
            data=await data.json();
            // console.log('This is autosuggest data>>',data)
            
            searchRes[searchText]=data?.result?.data
            dispatch(setAutoSuggestions(searchRes))
            // console.log('This is autosuggestion>>>',data)
        }
        setSearchResults(autoSuggestionResults[searchText])

    }
}
    // const assigned

    const onChangeDate = (newDate) => {
      setDate(newDate);
    };

    const handleSubmit = async (event) => {
        setModal(false)
        event.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('title', title.current.value);
        formDataToSend.append('description', description.current.value);
        formDataToSend.append('assignedTo',String(assignedTo))
        formDataToSend.append('subtask',{})
        formDataToSend.append('projectId',projectId.current.value)
        formDataToSend.append('deadline',deadLine.current.value)
        formDataToSend.append('priority',priority.current.value)
    
        const files = fileInputRef.current.files;
        for (let i = 0; i < files.length; i++) {
          formDataToSend.append('attachments', files[i]);
        }

        // console.log('This is form data',formDataToSend)
    
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
    <form className='absolute md:w-1/2 border border-slate-300 bg-white left-[50%] top-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-[100%] overflow-y-scroll p-2 shadow-lg rounded-md flex flex-col gap-2'>
        <button className='m-0 p-0 text-left' onClick={()=>setModal(false)}>x</button>


        <input type="text" name='title' placeholder='Enter title' className='p-2 border border-slate-300 rounded-md shadow-sm m-1' ref={title}/>

        <textarea name="description" id="description" cols={5} rows={5} className='border border-slate-300 shadow-sm rounded-md overflow-y-scroll p-2' ref={description} placeholder='Description'></textarea>
        <div className="relative">
        <input type="text" autoComplete='off' name='assign' placeholder='Assign To' value={searchText} onChange={(e)=>setSearchText(e.target.value)} onFocus={()=>setSearchResultStatus(true)} onBlur={()=>setTimeout(()=>setSearchResultStatus(false),200)} className='p-2 border border-slate-300 text-slate-900 rounded-md shadow-sm m-1 w-[99%]' ref={assignTo}/>
        {(searchResultStatus && searchResults)?<div className="absolute bottom-0 top-[90%] w-[99%] z-20 border border-slate-300 bg-white px-2 pt-2 pb-10">
          {
            searchResults && <>
                {
                  searchResults.map((element)=><>
                  <p className='cursor-pointer text-slate-900 hover:bg-gray-50 rounded-md' onClick={()=>searchSuggestionClickHandle(element)}>{element.name}</p>
                  </>)
                }
            </>
          }

        </div>:""}

        {/* search select list starts here */}
        <div className='flex gap-4'>
          {
            searchSelectList.length?searchSelectList.map(item=><>
            <p className='px-4 py-1` rounded-md border border-slate-300 text-slate-900'>{item?.name}</p>
            </>):""
          }
        </div>
        </div>
         {/* to be done later */}
        {/* <select name="projects" id="projects" className='p-2 border border-slate-300 rounded-md shadow-sm m-1'>
            <option value="sample">
                Vision
            </option>
        </select> */}

 

        <select name="priority" id="priority" className='p-2 border border-slate-300 rounded-md shadow-sm m-1 text-slate-900' ref={priority}>
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

        {/* <input type="text" placeholder='Enter ProjectId' name='projectId' className='p-2 border border-slate-300 rounded-md shadow-sm m-1' ref={projectId}/> */}
        <select name="projects" className='p-2 border border-slate-300 rounded-md shadow-sm m-1 text-slate-900' ref={projectId} id="projects">
          <option value="" selected disabled>Select Project</option>
          {
            projectResults?projectResults.map(project=><>
            <option key={project?._id} value={project?._id}>{project.name}</option>
            </>) :""
          }
        </select>

        <div className="relative">
        <input type="text" id='deadline' placeholder='Enter deadLine' name='date' className='p-2 border border-slate-300 rounded-md shadow-sm m-1 w-[99%]' value={moment(date).format('YYYY-MM-DD')} ref={deadLine} onFocus={()=>setCalendarStatus(true)}/>

        {calendarStatus?<Calendar className="absolute"
        onChange={onChangeDate}
        value={date}
        minDate={new Date()}
        onClickDay={()=>setCalendarStatus(false)}
      />:""}
        </div>
        

        <input type="file" multiple className='p-2 border border-slate-300 rounded-md shadow-sm m-1' ref={fileInputRef} name='file' />

        <button className='bg-slate-900 p-2 text-white rounded-md' onClick={handleSubmit}>Add Task</button>
    </form>
  )
}

export default CreateTaskPopup