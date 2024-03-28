import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { Context, ServerUrl } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import Todo from '../components/Todo';
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const UpdateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${ServerUrl}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const DeleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${ServerUrl}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${ServerUrl}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${ServerUrl}/task/mytasks`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className='bg-primarybg text-textColor w-full h-full flex justify-center items-center flex-col p-10'>
      <form action="" onSubmit={submitHandler}>
        <section className='w-[50vw]  bg-secondarybg text-primarybg  p-5 flex flex-col justify-around rounded-xl gap-3 mb-10'>
          <div>
            <h1 className='text-center font-semibold text-2xl'>Create the Task</h1>
          </div>
          <div>
            <label htmlFor="title" className='text-xl font-medium'>Title:</label>
            <input
              className='w-full h-[50px] p-1 px-3'
              type="text"
              placeholder='Add title'
              required value={title}
              onChange={(e) => setTitle(e.target.value)}
              name='title'
              id='title' />
          </div>
          <div>
            <label htmlFor="description" className='text-xl font-medium'>Desciption:</label>
            <input
              className='w-full h-[50px] p-1 px-3'
              type="text"
              placeholder='Add description'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name='description'
              id="description" />
          </div>
          <div className='w-full flex justify-center'>
            <button  disabled={loading} type="submit" className='bg-primarybg text-textColor px-3 py-2 rounded-lg '>Add Task</button>
          </div>
        </section>
      </form>
      <hr className='w-full h-[2px] bg-secondarybg ' />
      <section className='text-textColor w-full h-full p-8 mt-5'>
        <h1 className='text-center text-3xl'>My Tasks</h1>
        <div className='flex justify-between items-center mt-4 flex-col flex-wrap-reverse gap-4'>
          {
            tasks.map(items =>(
              <Todo 
              title={items.title} 
              desc={items.description} 
              isCompleted={items.isComplete} 
              UpdateHandler={UpdateHandler} 
              DeleteHandler={DeleteHandler} 
              id={items._id} 
              key={items._id}/>
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default Home