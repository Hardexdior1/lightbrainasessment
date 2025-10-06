
'use client'
import { X, Trash2 } from "lucide-react";
import { examSchema } from "./ExamSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect } from "react";
import { Exam } from "../types/page";

  type ExamFormData = z.infer<typeof examSchema>;

interface CreateEditModalProps {
  showCreateEdit: boolean;
  setShowCreateEdit: (show: boolean) => void;
  title:string;
  exams: Exam[];
  setExams: (exams: Exam[]) => void;
  editingExam: Exam | null;
  setEditingExam: (exam: Exam | null) => void;
  onCancel: () => void;
}

const CreateEditModal = ({
  exams,
  showCreateEdit,
  setShowCreateEdit,
  title,
  editingExam,
  setEditingExam,
  setExams,

}: CreateEditModalProps) => {
    
 const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: "",
      description: "",
      course: "",
      year: "",
      dateCreated: "",
      dateDue: "",
      weight: "",
      maxPoints: 0,
      passingThreshold: 0,
      visible: true,
    },
  });

    const onSubmit: import("react-hook-form").SubmitHandler<ExamFormData> = (data) => {
    if (editingExam) {
      const updated = exams.map((exam) =>
        exam.id === editingExam.id ? { ...exam, ...data } : exam
      );
      setExams(updated);
    } else {
      const newExam: Exam = {
        id: Date.now().toString(),
        ...data,
        status: "Not Attempted",
      };
      setExams([...exams, newExam]);
    }

    reset();
    setEditingExam(null);
    setShowCreateEdit(false);
  };

useEffect(() => {
  if (editingExam) {
    reset({
      title: editingExam.title || "",
      description: editingExam.description || "",
      course: editingExam.course || "",
      dateCreated: editingExam.dateCreated || "",
      dateDue: editingExam.dateDue || "",
      weight: editingExam.weight || "",
      maxPoints: editingExam.maxPoints || 0,
      passingThreshold: editingExam.passingThreshold || 0,
      visible: editingExam.visible ?? true,
      year: editingExam.year || "", 
    });
  } else {
    reset({
      title: "",
      description: "",
      course: "",
      dateCreated: "",
      dateDue: "",
      weight: "",
      maxPoints: 0,
      passingThreshold: 0,
      visible: true,
        year: "", 
    });
  }
}, [editingExam, reset]);
  return (
    <div
      className={`fixed inset-0 bg-[rgba(57,64,58,0.35)]  backdrop-blur-[3.5px] flex items-end md:items-center justify-center z-50 transition-all duration-300 ease-in-out
      ${showCreateEdit ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
    `}
    >
      <div className="bg-white relative py-8 px-10 h-[600px] overflow-y-scroll max-w-4xl rounded-tr-[16px] rounded-tl-[16px] md:rounded-[16px] shadow-lg w-full sm:w-fit flex flex-col items-center gap-6 lg:max-h-[700px]">
        {/* Close Button */}
        <button
          onClick={() => setShowCreateEdit(false)}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

       
        <div className="text-left w-full">
             <h2 className="text-black font-bold text-2xl md:text-3xl">
        {title} 
        </h2>
        </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
  {/* Exam Title */}
  <div>
    <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
      Exam Title
    </label>
    <input
      id="title"
      type="text"
      placeholder="Enter exam title"
      {...register("title", { required: "Title is required" })}
      className="border p-3 w-full rounded-md"
    />
    {errors.title && <p className="text-red text-sm">{errors.title.message}</p>}
  </div>
  <div>
  <label className="block text-gray-700 font-medium mb-1">
    Year:
  </label>

  <select
    {...register("year")}
        className="border p-3 w-full rounded-md"

  >
    <option value="">Select year</option>
    <option value="Yr1">Year 1</option>
    <option value="Yr2">Year 2</option>
    <option value="Yr3">Year 3</option>
    <option value="Yr4">Year 4</option>
  </select>
</div>


  {/* Description */}
  <div>
    <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
      Exam Description
    </label>
    <textarea
      id="description"
      placeholder="Enter exam description"
      {...register("description", { required: "Description is required" })}
      className="border p-3 w-full rounded-md h-24 resize-none"
    />
    {errors.description && (
      <p className="text-red text-sm">{errors.description.message}</p>
    )}
  </div>

  {/* Dates and Course */}
  <div className="flex flex-col md:flex-row gap-4">
    {/* Start Date */}
    <div className="flex-1">
      <label htmlFor="dateCreated" className="block text-gray-700 font-medium mb-1">
        Start Date
      </label>
      <input
        id="dateCreated"
        type="date"
        {...register("dateCreated", { required: "Start date is required" })}
        className="border p-3 w-full rounded-md"
      />
      {errors.dateCreated && (
        <p className="text-red text-sm">{errors.dateCreated.message}</p>
      )}
    </div>

    {/* End Date */}
    <div className="flex-1">
      <label htmlFor="dateDue" className="block text-gray-700 font-medium mb-1">
        End Date
      </label>
      <input
        id="dateDue"
        type="date"
        {...register("dateDue", { required: "End date is required" })}
        className="border p-3 w-full rounded-md"
      />
      {errors.dateDue && (
        <p className="text-red text-sm">{errors.dateDue.message}</p>
      )}
    </div>

    {/* Course */}
    <div className="flex-1">
      <label htmlFor="course" className="block text-gray-700 font-medium mb-1">
        Course
      </label>
      <input
        id="course"
        type="text"
        placeholder="Enter course name"
        {...register("course", { required: "Course is required" })}
        className="border p-3 w-full rounded-md"
      />
      {errors.course && (
        <p className="text-red text-sm">{errors.course.message}</p>
      )}
    </div>
  </div>

  {/* Max Points, Weight, Passing Threshold */}
  <div className="flex flex-col md:flex-row gap-4">
    {/* Max Points */}
    <div className="flex-1">
      <label htmlFor="maxPoints" className="block text-gray-700 font-medium mb-1">
        Maximum Points
      </label>
      <input
        id="maxPoints"
        type="number"
        placeholder="Enter maximum points"
        {...register("maxPoints", { valueAsNumber: true, required: "Maximum points required" })}
        className="border p-3 w-full rounded-md"
      />
      {errors.maxPoints && (
        <p className="text-red text-sm">{errors.maxPoints.message}</p>
      )}
    </div>

    {/* Weight */}
    <div className="flex-1">
      <label htmlFor="weight" className="block text-gray-700 font-medium mb-1">
        Weight
      </label>
      <input
        id="weight"
        type="text"
        placeholder="Enter weight"
        {...register("weight", { required: "Weight is required" })}
        className="border p-3 w-full rounded-md"
      />
      {errors.weight && <p className="text-red text-sm">{errors.weight.message}</p>}
    </div>

    {/* Passing Threshold */}
    <div className="flex-1">
      <label htmlFor="passingThreshold" className="block text-gray-700 font-medium mb-1">
        Passing Threshold (%)
      </label>
      <input
        id="passingThreshold"
        type="number"
        placeholder="Enter passing threshold"
        {...register("passingThreshold", {
          valueAsNumber: true,
          required: "Passing threshold required",
        })}
        className="border p-3 w-full rounded-md"
      />
      {errors.passingThreshold && (
        <p className="text-red text-sm">{errors.passingThreshold.message}</p>
      )}
    </div>
  </div>

  <div className="flex flex-col justify-between my-4 md:flex-row gap-4 items-end md:items-center">
  <label className="block text-gray-700 font-medium mb-1 md:mb-0">
    Visible to Students:
  </label>

  <div className="flex gap-6 ">
    <label className="flex items-center gap-2">
     <input
  type="radio"
  value="true"
  {...register("visible")}
  checked={Boolean(watch("visible")) === true}
  onChange={() => setValue("visible", true)}
  className="w-4 h-4"
/>

      <span>Yes</span>
    </label>

    <label className="flex items-center gap-2">
      <input
  type="radio"
  value="false"
  {...register("visible")}
  checked={Boolean(watch("visible")) === false}
  onChange={() => setValue("visible", false)}
  className="w-4 h-4"
/>

      <span>No</span>
    </label>
  </div>
</div>

  {/* Buttons */}
  <div className="flex flex-col md:flex-row gap-4 w-full mt-4 md:gap-6">
    <button
      type="button"
      className="flex-1 py-3 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition text-center"
      onClick={() => setShowCreateEdit(false)}
    >
      Cancel
    </button>

    <button
      type="submit"
      className="flex-1 py-3 bg-black text-white rounded-md hover:bg-black-700 transition text-center"
    >
      Update
    </button>
  </div>
</form>


      
       
      </div>
    </div>
  );
};

export default CreateEditModal;
