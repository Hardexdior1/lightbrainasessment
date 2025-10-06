

"use client";

import { Exam } from "@/types/page";
import { CiSearch } from "react-icons/ci";
import { formatDate } from "./Format";
import { useState } from "react";

interface SearchProps {
  fullExams?: Exam[];
  setExams: (exams: Exam[]) => void;
}

const Search = ({ setExams, fullExams }: SearchProps) => {
  const dates = [...new Set(fullExams?.map((exam) => exam.dateCreated))];
  const courses = [...new Set(fullExams?.map((exam) => exam.course))];

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  //  Filter by Date
  const filterByDateCreated = (date: string) => {
    if (date === "") {
      setExams(fullExams ?? []);
      return;
    }
    const filteredExams = fullExams?.filter((exam) => exam.dateCreated === date);
    setExams(filteredExams ?? []);
  };

  //  Filter by Course
  const filterByCourse = (course: string) => {
    if (course === "") {
      setExams(fullExams ?? []);
      return;
    }
    const filteredExams = fullExams?.filter((exam) => exam.course === course);
    setExams(filteredExams ?? []);
  };

  const [searchTerm, setSearchTerm] = useState("");

  // search
  const handleSearch = (query: string) => {
  setSearchTerm(query); 
  if (query.trim() === "") {
    setExams(fullExams ?? []);
    return;
  }

  const filtered = fullExams?.filter((exam: Exam) =>
    exam.title.toLowerCase().includes(query.toLowerCase())
  );

  setExams(filtered ?? []);
};


  return (
    <section className="flex flex-col lg:flex-row gap-3 items-center justify-center">
      {/* 🔍 Search Input */}
      <form className="relative w-full lg:flex-[2]">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
          <CiSearch size={25} className="cursor-pointer" />
        </div>
        <input
          type="search"
      onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
          className="w-full border bg-gray-200 border-gray-300 py-3 pl-10 pr-3 rounded-full text-blue-900"
          placeholder="Search"
        />
      </form>

      {/* 🔹 Filters */}
      <div className="flex items-center gap-3 flex-col lg:flex-[3] w-full md:flex-row">
        {/* Date Filter */}
        <select
          className="p-3 bg-gray-200 rounded-full border border-gray-300 w-full"
          value={selectedDate}
          onChange={(e) => {
            const date = e.target.value;
            setSelectedDate(date);
            filterByDateCreated(date);
          }}
        >
          <option value="">Filter by Date Created</option>
          {dates.map((date) => (
            <option key={date} value={date}>
              {formatDate(date)}
            </option>
          ))}
        </select>

        {/* Course Filter */}
        <select
          className="p-3 bg-gray-200 rounded-full border border-gray-300 w-full"
          value={selectedCourse}
          onChange={(e) => {
            const course = e.target.value;
            setSelectedCourse(course);
            filterByCourse(course);
          }}
        >
          <option value="">Filter by Course</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default Search;
