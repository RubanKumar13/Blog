"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [posts,setposts] =  useState([]);
  const inputRef = useRef("");
  const [search,setsearch] = useState(false);

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_API_URL+'/posts')
    .then((res)=>res.json())
    .then(res => setposts(res));
  },[]);

  const searchPost =(e)=>{

    if(e.type == 'keydown' && e.key !== 'Enter'){
      return;
    }
    setsearch(true)
    fetch(process.env.NEXT_PUBLIC_API_URL+'/posts?q='+inputRef.current.value)
    .then((res)=>res.json())
    .then(res => setposts(res))
    .finally(()=>setsearch(false))
  }


  return (
    <>

    <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </main>
    <div className="flex justify-end px-4">
    <input ref={inputRef} type="text" disabled={search} onKeyDown={searchPost} className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." />
    <button onClick={searchPost} disabled={search} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">{search?'...':'Search'}</button>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
       {posts.map((post)=>(
        <Link key={post.id}  href={"/post/"+post.id}>
        <div  className="border border-gray-200 p-4">
          <img  className="w-full h-48 object-cover mb-4" src={post.image} alt="Post Image" />
          <h2  className="text-xl font-semibold mb-2">{post.title}</h2>
          <p  className="text-gray-600">{post.short_description}</p>
        </div>
        </Link>
       ))}
       { !posts.length > 0 && inputRef.current.value && <p className="text-4xl ">No Post available for this query:<b>{inputRef.current.value}</b></p>}
    </div>
    </>
  );
}
