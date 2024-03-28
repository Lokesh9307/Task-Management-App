import React from 'react'

const Todo = ({ title, desc, isCompleted,UpdateHandler,DeleteHandler,id }) => {
    return (
        <div className='bg-secondarybg text-primarybg w-[60vw] h-auto rounded-lg p-3 border-2 border-slate-400 flex items-center justify-between'>
            <div>
            <h2>{title}</h2>
            <p>{desc}</p>
            </div>
            <div className='flex items-center justify-around gap-4'>
                <input onChange={()=>UpdateHandler(id)} type="checkbox" name='' id='' className="w-6 h-6" checked={isCompleted}/>
                <button onClick={()=>DeleteHandler(id)} className='bg-red-500/85 flex items-center justify-center text-white py-1 px-2 rounded-md'>Delete</button>
            </div>
        </div>
    )
}

export default Todo