import React, { useEffect, useState } from 'react'
import { BACKEND_IMAGE_URL, BACKEND_SOCKET_URL, BACKEND_URL } from '../../utils/constants'
import Cookies from 'universal-cookie'
import socketIOClient from 'socket.io-client';
import moment from 'moment';

const socket = socketIOClient(BACKEND_SOCKET_URL,{ transports : ['websocket'] });

const CommentContainer = ({taskId}) => {
    const [comments,setComments]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState(1)
    const [commentText,setCommentText]=useState("")
    const cookies = new Cookies(null, { path: '/'});
        let token=cookies.get('token')

    const handleSubmit=async()=>{
        let postComment=await fetch(BACKEND_URL+'/common/create-comment',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
            body:JSON.stringify({
                comment:commentText,
                taskId:taskId
            })
        })

        postComment=await postComment.json()
        setCommentText("")
    }

    const getComments=async()=>{
        

        let data=await fetch(BACKEND_URL+'/common/view-comments?taskId='+taskId+'&pageNo='+currentPage,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            }
        })

        data=await data.json()
        if(data?.result?.data?.result){

            setComments(data?.result?.data?.result)
            const {total,pageSize}=data?.result?.data?.pageData
            setTotalPage(Math.ceil(total/pageSize))
        }
        console.log("this is comments",comments)

    }

    socket.on(`newComment:${taskId}`, (comment) => {
        if(comments.length){
            setComments([comment,...comments]);
            
        }else {
            setComments([comment])
        }
        // console.log("This is comment from socket >>",comment)
      });

    useEffect(()=>{
        getComments()
    },[taskId,currentPage])
  return (
    <div>
        <div className="flex md:flex-row flex-col h-fit">
            <div className="md:w-[45%] w-full border border-slate-200 p-4 flex flex-col">
                <textarea name="comment" value={commentText} onChange={(e)=>setCommentText(e.target.value)} id="comment" className='border border-slate-300 w-full p-4 rounded-md shadow-lg' rows={10}></textarea>
                <button className='bg-slate-900 text-white rounded-md p-4 mt-4' onClick={handleSubmit}>Comment</button>
            </div>
            <div className="md:w-[55%] w-full border border-slate-200">
                <p className='text-center mt-4'>COMMENTS</p>
                {
                    (!comments.length) && <p className='text-center'>No Comments Found</p>
                }
                {
                    (comments.length) && <>
                    <div className="flex flex-col gap-5 p-6">
                    {
                        comments.map(comment=>(<div className='flex flex-col gap-3 border border-slate-300 shadow-md p-4 rounded-lg' key={comment._id}>
                            <div className="flex justify-between items-center align-middle">
                            <p className='text-slate-500'>{comment?.email}</p>
                            <p className='text-slate-500'>{moment(comment?.createdAt).format('YYYY-MM-DD HH:MM')}</p>
                            </div>
                            <div className='flex items-center gap-3'>
                          <p className='bg-slate-900 text-white rounded-full px-4 py-2 my-5'>
                            {comment?.email[0]}
                            </p> 
                            <p className='text-slate-500'>{comment?.comment}</p> 
                            </div>
                        </div>))
                    }
                    <div>
                        {(currentPage!==totalPage)&&<button onClick={()=>setCurrentPage(currentPage+1)} className='border border-slate-900 text-slate-900 p-3 rounded-xl'>View Older Comments</button>}
                    </div>
                    </div>
                    </>
                }
            </div>
        </div>
    </div>
  )
}

export default CommentContainer