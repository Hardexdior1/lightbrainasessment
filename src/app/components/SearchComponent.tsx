'use client'
import { Exam } from "@/types/page";
import { CiSearch } from "react-icons/ci";
import { formatDate } from "./Format";
import { useState } from "react";
interface SearchProps{
  handleSearch:(query:string)=>void,
  
  exams: Exam[];
  setExams: (exams: Exam[]) => void;
 
}


const Search = ({ handleSearch , exams,setExams}: SearchProps) => {
    const dates = [...new Set(exams.map((exam) => exam.dateCreated))];
  const courses = [...new Set(exams.map((exam) => exam.course))];
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // Filter by date
  const filterByDateCreated = (date: string) => {
    if (date === "") {
      setExams(exams);
      return;
    }
    const filteredExams = exams.filter((exam) => exam.dateCreated === date);
    console.log("filteredExams", filteredExams);
    setExams(filteredExams)}

// filter by cours
    const filterByCourse = (course: string) => {
    if (course === "") {
        setExams(exams);
      return;
    }
    const filteredExams = exams.filter((exam) => exam.course === course);
    console.log("filteredExams", filteredExams);
    setExams(filteredExams);
  };
 return <>
   
<section className="flex flex-col lg:flex-row gap-3 items-center justify-center">
  <form className="relative w-full lg:flex-[2] ">
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
      <CiSearch size={25} className="cursor-pointer" />
    </div>
    <input
      type="search"
       onChange={(e) => handleSearch(e.target.value)}
      className="w-full border bg-gray-200 border-gray-300 py-3 pl-10 pr-3 rounded-full text-blue-900"
      placeholder="Search"
    />
  </form>

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

</>
}
export default Search