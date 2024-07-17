"use client";

import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function generateUniqueId() {
  const timestamp = Date.now().toString(36).slice(-4);
  const randomComponent = Math.random().toString(36).substring(2, 7);
  return `${timestamp}${randomComponent}`;
}

const mailID = generateUniqueId();

export default function Home() {
  const alert1 = () => toast("Email entered successfully");
  const alert2 = () => toast("Feature coming soon");

  const [imageURL, setImageURL] = useState("");

  const fileInputRef = useRef(null);
  const dataDivRef = useRef(null);
  const formRef = useRef(null);

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    const fr = new FileReader();
    fr.fileName = file.name;
    fr.onload = function (e) {
      const result = e.target.result;
      const html = `
        <input type="hidden" name="data" value="${result.replace(/^.*,/, "")}" >
        <input type="hidden" name="mimetype" value="${
          result.match(/^.*(?=;)/)[0]
        }" >
        <input type="hidden" name="filename" value="${e.target.fileName}" >
      `;
      dataDivRef.current.innerHTML = html;
    };
    fr.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    fetch(
      "https://script.google.com/macros/s/AKfycbxhmFqHHpJws-rjUyx8A8k4rmkxw4zAM81dxv5yVN1rAveShu55zJwInKu51ylfkTI0zw/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          setImageURL(data.url);
          alert("Email entered successfully");
          window.location.reload();
        } else {
          console.error("Error uploading file:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };
  // useEffect(() => {
  //   console.log("Count updated:", imageURL); // Logs after every state update
  // }, [imageURL]); // Dependency array to run effect when 'count' changes

  return (
    <div>
      <div className="text-center mt-36 text-xl">
        ELECTRONIC MAIL MANAGEMENT
      </div>

      <form
        className="max-w-lg mx-auto uploadForm"
        method="POST"
        id="form"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <h6 className="mb-4" suppressHydrationWarning>
          Mail Id: {mailID}
        </h6>
        <div className="hidden">
          <input type="text" name="Mail_id" value={mailID} />
        </div>
        <div className="hidden">
          <input type="text" name="URL" value={imageURL} />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="Sender"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Sender
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="Title"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="Title"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="Endoersed_By"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Endorsed by
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="Remarks"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Remarks
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="Dispatched_To"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Dispatched To
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="Date_dispatched"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date Dispatched
            </label>
          </div>
        </div>
        <input
          name="file"
          id="uploadfile"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div id="data" ref={dataDivRef}></div>
        <button
          id="btnSubmit"
          type="submit"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>{" "}
        <ToastContainer />
        <br />
        <button
          onClick={alert2}
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Track mail
        </button>
      </form>
      <div className="m-auto text-center mt-8">
        <Link
          className="p-4 bg-green-500 rounded-md mr-4"
                    target="#"

          href={
            "https://docs.google.com/spreadsheets/d/1xdSrAoVfT6oKMVaro4cAsMpm_hzW9ZR_Pbm79kkY_1U/edit?gid=0#gid=0"
          }
        >
          {" "}
          Database
        </Link>

        <Link
          className="p-4 bg-green-500 rounded-md"
          target="#"
          href={
            "https://drive.google.com/drive/u/2/folders/1NzOkj1eF4ggf3pNUSyeZMzaTv3MWXK91"
          }
        >
          {" "}
          Attachment folder
        </Link>
      </div>
    </div>
  );
}
