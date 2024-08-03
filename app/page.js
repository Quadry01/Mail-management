"use client";

import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
BeatLoader;
import BeatLoader from "react-spinners/BeatLoader";
const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function generateUniqueId() {
  const timestamp = Date.now().toString(36).slice(-4);
  const randomComponent = Math.random().toString(36).substring(2, 7);
  return `${timestamp}${randomComponent}`;
}

let ID = generateUniqueId();

export default function Home() {
  const alert1 = () => toast("Email entered successfully");
  const alert2 = () => toast("Feature coming soon");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [color, setColor] = useState("#953131");
  let globalImageURL = "";
  // const [imageURL, setImageURL] = useState(globalImageURL);
  const [mailQeury, setMailQuery] = useState("");
  let [tableHeader, setTableHeader] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [mailID, setmailID] = useState(generateUniqueId());
  const fileInputRef = useRef(null);
  const dataDivRef = useRef(null);
  const formRef = useRef(null);
  let Hearders = [
    "Date",
    "Mail_id",
    "Sender",
    "Title",
    "Endoersed_By",
    "Remarks",
    "Dispatched_To",
    "Date_dispatched",
    "URL",
  ];
  // SEARCH QUERY
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbw_Lk9yqHs_9MObuDVWofREGXf1FQYy91XA3AHQseI2xtiHLzDT5PUcxHnWONyRmPmDGQ/exec"; // Replace with your script URL

  async function fetchData() {
    try {
      const response = await fetch(
        `${scriptUrl}?mailId=${encodeURIComponent(mailQeury)}`
      );
      const result = await response.json();

      if (result.result === "success") {
        displayData(result.data);
        setLoading2(false);
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const displayData = (data) => {
    // Update table header

    const headerRow = data.map((_, index) => `Colum ${index + 1}`);
    // setTableHeader(headerRow);

    setTableHeader(Hearders);

    // Update table body
    setTableBody([data]);
  };

  // FILE HANDLER
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

  // FORM SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    fetch(
      "https://script.google.com/macros/s/AKfycbw_Lk9yqHs_9MObuDVWofREGXf1FQYy91XA3AHQseI2xtiHLzDT5PUcxHnWONyRmPmDGQ/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          globalImageURL = data.url;
          alert(mailID, globalImageURL);
          setLoading(false);
          window.location.reload();
        } else {
          console.error("Error uploading file:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <>
      <div className="flex h-4/5 px-40 py-8 ">
        <div className="w-3/6 rounded-l-lg bg-red-900 text-white ">
          <h1 className="text-center mt-52  text-4xl">Welcome</h1>
          <h4 className="text-center mt-2  text-xl">
            To the Mail Management System
          </h4>
        </div>
        <div className="w-3/6 p-2 pt-4 pb-9 bg-amber-200 rounded-r-lg">
          <form
            className="  uploadForm"
            method="POST"
            id="form"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="hidden">
              <input type="text" name="Mail_id" value={mailID} />
            </div>
            <div className="hidden">
              <input type="text" name="URL" value={globalImageURL} />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="Sender"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0  peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Sender*
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
                Title*
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
                Endorsed by*
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="Remarks"
                  type="text"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                >
                  <option className="" value=""></option>
                  <option value="New">New</option>
                  <option value="Minute">Minute</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Confidential">Confidential</option>
                  <option value="Immidiate">Immidiate</option>
                </select>
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Remarks*
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
                  Dispatched To*
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
                  Date Dispatched*
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
              className="text-white mt-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-red-950 to-amber-500 "
            >
              Submit
            </button>
            <ClipLoader
              color={color}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <ToastContainer />
          </form>

          {/* SEARCH SECTION */}
          <form
            className="max-w-lg mx-auto mt-8 uploadForm"
            onSubmit={fetchData()}
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                onChange={(e) => setMailQuery(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              />
              <label
                htmlFor="Title"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Mail id
              </label>
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setLoading2(true);
      
              }}
              className="text-white mt-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-red-950 to-amber-500"
            >
              Track mail
            </button>

            <BeatLoader
              color={color}
              loading={loading2}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
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
      </div>

      {/* DIDPLAY TABLE HERE */}
      <table
        style={{
          marginTop: "0px",
          borderCollapse: "collapse",
          width: "100%",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <thead>
          <tr>
            {tableHeader.map((header, index) => (
              <th
                key={index}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                  backgroundColor: "#f2f2f2",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
