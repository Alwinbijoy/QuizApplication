"use client";
import { Package } from "@/types/package";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineEditLocation } from "react-icons/md";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

// const packageData: Package[] = [
//   {
//     name: "Free package",
//     price: 0.0,
//     invoiceDate: `Jan 13,2023`,
//     status: "Paid",
//   },
//   {
//     name: "Standard Package",
//     price: 59.0,
//     invoiceDate: `Jan 13,2023`,
//     status: "Paid",
//   },
//   {
//     name: "Business Package",
//     price: 99.0,
//     invoiceDate: `Jan 13,2023`,
//     status: "Unpaid",
//   },
//   {
//     name: "Standard Package",
//     price: 59.0,
//     invoiceDate: `Jan 13,2023`,
//     status: "Pending",
//   },
// ];

const TableThree = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  // const {state, setState} = useState (intialState);
 
  //const {question, option1, option2 , option3, option4, correctAnswer} = state;

  useEffect(() => {
    loadData();
  }, []);

  const {id} = useParams();

//   useEffect{() => {
//  axios.get('http://localhost:5000/api/get/&{id}').then((resp) => useState({...resp.data[0]}))
//   }, [id]}

  const deleteQuiz = (id) => {
    if (window.confirm("Are you want to delete?")) {
      axios.delete("http://localhost:5000/api/remove/${id}");
      toast.success("Contact Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
        <Link
          href={"forms/form-layout"}
          className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Create Question +
        </Link>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Question
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Option 1
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Option 2
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Option 3
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Option 4
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Answer
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    {item.question}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    {item.option1}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    {item.option2}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    {item.option3}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    {item.option4}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    {item.correctAnswer}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <Link href={"/update/ ${item.id}"}>
                          <MdOutlineEditLocation></MdOutlineEditLocation>
                        </Link>
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => deleteQuiz(item.id)}
                      >
                        <Link href={"/view/ ${item.id}"}>
                          <FaEye></FaEye>
                        </Link>
                      </button>
                      <button className="hover:text-primary">
                        <Link href={"/delete/ ${item.id}"}>
                          <FaTrashAlt></FaTrashAlt>
                        </Link>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
