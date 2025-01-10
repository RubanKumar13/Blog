"use client";

import { useState } from "react";

export default function Contact() {
  const [inputs, setinputs] = useState({});
  const [message, setmessage] = useState("");

  const handleinput = (e) => {
    setinputs((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_API_URL + "/enquiry", {
      method: "POST",
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((res) => {
        setmessage(res.message);
        setinputs({});
        setTimeout(()=>{
            setmessage("")
        }, 3000)
      });
  };
  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <form className="w-full max-w-lg" onSubmit={handlesubmit}>
          <div className="flex items-center mb-4">
            <label htmlfor="name" className="w-1/4">
              Name:
            </label>
            <input
              type="text"
              name="names"
              onChange={handleinput}
              value={inputs.names ?? ""}
              id="name"
              className="border rounded px-2 py-1 w-3/4"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlfor="email" className="w-1/4">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleinput}
              value={inputs.email ?? ""}
              className="border rounded px-2 py-1 w-3/4"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlfor="message" className="w-1/4">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              onChange={handleinput}
              value={inputs.message ?? ""}
              className="border rounded px-2 py-1 w-3/4"
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
        {message && <p>{message}</p>}
      </main>
    </>
  );
}
