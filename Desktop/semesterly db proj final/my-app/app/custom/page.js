'use client';
import { useState } from "react";

export default function FormPage() {
  // State to manage form data with empty initial values
  const [formData, setFormData] = useState({
    code: "",
    course: "",
    teacher: "",
    program: "",
    lecDay: "",
    lecTime: "",
    labDay: "",
    labTime: "",
  });

  // State to handle form submission status
  const [status, setStatus] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Data submitted successfully!");
      } else {
        setStatus("Error submitting data.");
      }
    } catch (error) {
      setStatus("Error submitting data.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "3rem", // Increase the font size of the heading
          marginBottom: "20px", // Add some space below the heading
        }}
      >
        Add Course
      </h1>

      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="code" style={{ display: "block", marginBottom: "5px" }}>
            Course Code
          </label>
          <input
            type="number"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="course" style={{ display: "block", marginBottom: "5px" }}>
            Course Name
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="teacher" style={{ display: "block", marginBottom: "5px" }}>
            Teacher
          </label>
          <input
            type="text"
            id="teacher"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="program" style={{ display: "block", marginBottom: "5px" }}>
            Program
          </label>
          <select
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Program</option>
            <option value="BSCS">BSCS</option>
            <option value="BSSE">BSSE</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="lecDay" style={{ display: "block", marginBottom: "5px" }}>
            Lecture Day
          </label>
          <input
            type="number"
            id="lecDay"
            name="lecDay"
            value={formData.lecDay}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="lecTime" style={{ display: "block", marginBottom: "5px" }}>
            Lecture Time
          </label>
          <input
            type="number"
            id="lecTime"
            name="lecTime"
            value={formData.lecTime}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="labDay" style={{ display: "block", marginBottom: "5px" }}>
            Lab Day
          </label>
          <input
            type="number"
            id="labDay"
            name="labDay"
            value={formData.labDay}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="labTime" style={{ display: "block", marginBottom: "5px" }}>
            Lab Time
          </label>
          <input
            type="number"
            id="labTime"
            name="labTime"
            value={formData.labTime}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
            marginTop: "10px",
            transition: "background-color 0.3s",
          }}
        >
          Submit
        </button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}

export async function POST(req, res) {
    try {
      const { code, course, teacher, program, lecDay, lecTime, labDay, labTime } = await req.json();
  
      // Insert into the appropriate table
      await db.insert('coursesTable').values({
        code,
        course,
        teacher,
        program,
        lecDay,
        lecTime,
        labDay,
        labTime,
      });
  
      return res.status(200).json({ message: "Course added successfully!" });
    } catch (error) {
      return res.status(500).json({ message: "Error inserting course data." });
    }
  }

