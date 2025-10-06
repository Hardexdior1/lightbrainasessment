"use client";

import React, { useState, useEffect } from "react";

import CreateEditModal from "./components/CreateEditExam";
import { MdCreateNewFolder, MdRemove } from "react-icons/md";
import { PiExportLight } from "react-icons/pi";
import { Exam } from "./types/page";
import { formatDate } from './components/Format'
import Search from "./components/SearchComponent";
import {  Edit } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";


const ExamDashboard: React.FC = () => {
  
  const [fullExams, setFullExams] = useState<Exam[]>([]);
    const [exams, setExams] = useState(fullExams);

  const [editingExam, setEditingExam] = useState<Exam | null>(null);

 
  useEffect(() => {
    const stored = localStorage.getItem("exams");
    if (stored) {
      setExams(JSON.parse(stored));
      setFullExams(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("exams", JSON.stringify(exams));
  }, [exams]);

  // Submit (create or edit)
  
  const [title,setTitle]=useState('Create Exam')
  const [showCreateEdit, setShowCreateEdit] = useState(false);

  const handleEdit = (exam: Exam) => {
    setEditingExam(exam);
    // reset(exam);
    setShowCreateEdit(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this exam?")) {
      const updated = exams.filter((exam) => exam.id !== id);
      setExams(updated);
    }
  };

  const handleCancel = () => {
    setEditingExam(null);
  };

  const handleSearch = (query: string) => {
    // Implement search logic here
    if (query.trim() === "") {
      const stored = localStorage.getItem("exams");
      if (stored) setExams(JSON.parse(stored));
      return;
    }
    const filtered = exams.filter((exam) =>
      exam.title.toLowerCase().includes(query.toLowerCase())
    );
    setExams(filtered);
    console.log("Searching for:", query);
  }



  return (
    <section className="w-fulll px-4 flex flex-col gap-14">
      <Search handleSearch={handleSearch} exams={fullExams} setExams={setExams}  />
      <CreateEditModal title={title} exams={exams}  showCreateEdit={showCreateEdit} setShowCreateEdit={setShowCreateEdit } editingExam={editingExam} setEditingExam={setEditingExam} setExams={setExams} onCancel={handleCancel}
  />

{exams.length === 0 ? (
  <div className="text-center text-2xl font-semibold">
    No exam created yet start by creating a new exam
  </div>
) : (
<>
  <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
      {exams.map((exam) => (
  <div
    key={exam.id}
    className="border py-6 px-4 rounded-xl flex flex-col "
  >
    {/* Title */}
    <h3 className="text-xl font-bold">{exam.title[0].toUpperCase() + exam.title.slice(1)}</h3>
        <h3 className="text-xl font-bold">{exam.year??""}</h3>


      <div className="flex justify-between  md:gap-4">
        <span className="font-medium">Course:</span>
        <span>{exam.course}</span>
      </div>

<div className="flex justify-between  md:gap-4">
        <span className="font-medium">Date  Created:</span>
        <span> {formatDate(exam.dateCreated)}</span>
      </div>

      <div className="flex justify-between  md:gap-4">
        <span className="font-medium">Date Due:</span>
        <span> {formatDate(exam.dateDue)}</span>
      </div>
 <div className="flex justify-between  md:gap-4">
        <span className="font-medium">Weight:</span>
        <span> <b>{exam.weight}%</b> of final grade  </span>
      </div>
    
    <div className="flex  justify-between items-center  md:gap-4">
      <div className="flex gap-3 mt-3">
        <Edit
        size={20}
        onClick={() => {
          handleEdit(exam);
          setTitle("Edit Exam");
        }}
        className="cursor-pointer text-black hover:text-blue-800"
      />
      <RiDeleteBin6Line
        size={20}
        onClick={() => handleDelete(exam.id)}
        className="cursor-pointer text-red hover:text-red-700"
      />
      </div>

          <button className="px-2 py-1  rounded-full text-white bg-black text-xs text-center flex items-center gap-2">  Grade Now </button>

    </div>
  </div>
))}

  </section>


</>
      )}
      <div className="flex flex-col md:flex-row justify-end gap-4 w-full md:w-auto">
  <button
    onClick={() => {
      setShowCreateEdit(true);
      setTitle("Create New Exam");
      setEditingExam(null);
    }}
    className="flex-1 md:flex-none px-5 py-3 min-w-[180px] rounded-full text-black bg-yellow font-semibold text-center flex items-center justify-center gap-2"
  >
    <MdCreateNewFolder size={20} /> Create New Exam
  </button>

  <button
    className="flex-1 md:flex-none px-5 py-3 min-w-[180px] rounded-full text-white bg-black font-semibold text-center flex items-center justify-center gap-2"
  >
    <PiExportLight size={20} /> Export
  </button>
</div>

    </section>
  );
};

export default ExamDashboard;



