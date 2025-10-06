
'use client';
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Exam } from "@/types/page";

interface CreateEditModalProps {
  showCreateEdit: boolean;
  setShowCreateEdit: (show: boolean) => void;
  title: string;
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
  const [formData, setFormData] = useState<Exam>({
    id: "",
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
    status: "Not Attempted",
  });

  // Prefill form when editing
  useEffect(() => {
    if (editingExam) {
      setFormData(editingExam);
    } else {
      setFormData({
        id: "",
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
        status: "Not Attempted",
      });
    }
  }, [editingExam]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value === "true" }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validation
  const validate = () => {
    if (!formData.title.trim()) return "Exam title is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.course.trim()) return "Course is required";
    if (!formData.dateCreated) return "Start date is required";
    if (!formData.dateDue) return "End date is required";
    if (!formData.weight.trim()) return "Weight is required";
    if (!formData.maxPoints) return "Maximum points required";
    if (!formData.passingThreshold) return "Passing threshold required";
    return "";
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    if (editingExam) {
  const updated = exams.map((exam) =>
    exam.id === editingExam.id ? { ...exam, ...formData } : exam
  );
  setExams(updated);
  localStorage.setItem("exams", JSON.stringify(updated));

} else {
  const newExam = { ...formData, id: Date.now().toString() };
  const updatedExams = [...exams, newExam];
  setExams(updatedExams);
  localStorage.setItem("exams", JSON.stringify(updatedExams));
}

setFormData({
        id: "",
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
        status: "Not Attempted",
      });
      

    setEditingExam(null);
    setShowCreateEdit(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-[rgba(57,64,58,0.35)] backdrop-blur-[3.5px] flex items-end md:items-center justify-center z-50 transition-all duration-300 ease-in-out
      ${showCreateEdit ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div className="bg-white relative py-8 px-10 h-[600px] overflow-y-scroll max-w-4xl rounded-tr-[16px] rounded-tl-[16px] md:rounded-[16px] shadow-lg w-full sm:w-fit flex flex-col items-center gap-6 lg:max-h-[700px]">
        <button
          onClick={() => setShowCreateEdit(false)}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="text-left w-full">
          <h2 className="text-black font-bold text-2xl md:text-3xl">{title}</h2>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Exam Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Exam Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter exam title"
              className="border p-3 w-full rounded-md"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Year:</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
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
            <label className="block text-gray-700 font-medium mb-1">Exam Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter exam description"
              className="border p-3 w-full rounded-md h-24 resize-none"
            />
          </div>

          {/* Dates & Course */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="dateCreated"
                value={formData.dateCreated}
                onChange={handleChange}
                className="border p-3 w-full rounded-md"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">End Date</label>
              <input
                type="date"
                name="dateDue"
                value={formData.dateDue}
                onChange={handleChange}
                className="border p-3 w-full rounded-md"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Enter course name"
                className="border p-3 w-full rounded-md"
              />
            </div>
          </div>

          {/* Max Points, Weight, Passing Threshold */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Maximum Points</label>
              <input
                type="number"
                name="maxPoints"
                value={formData.maxPoints}
                onChange={handleChange}
                className="border p-3 w-full rounded-md"
                placeholder="Enter maximum points"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="border p-3 w-full rounded-md"
                placeholder="Enter weight"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Passing Threshold (%)</label>
              <input
                type="number"
                name="passingThreshold"
                value={formData.passingThreshold}
                onChange={handleChange}
                className="border p-3 w-full rounded-md"
                placeholder="Enter passing threshold"
              />
            </div>
          </div>

          {/* Visibility */}
          <div className="flex flex-col justify-between my-4 md:flex-row gap-4 items-end md:items-center">
            <label className="block text-gray-700 font-medium mb-1 md:mb-0">
              Visible to Students:
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visible"
                  value="true"
                  checked={formData.visible === true}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span>Yes</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visible"
                  value="false"
                  checked={formData.visible === false}
                  onChange={handleChange}
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
              {editingExam ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditModal;
