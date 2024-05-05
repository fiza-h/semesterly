'use client'

import CourseCard from "./components/CourseCard";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import SelectedCourses from "./components/SelectedCourses";
import Table from "./components/Table";

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]); // State to store selected courses
  const [schedules, setSchedules] = useState([]); // Store all generated schedules
  const [currentPage, setCurrentPage] = useState(0); // Current schedule index

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.json'); // Fetch data from data.json in the public directory
      const data = await response.json();
      setCourses(data);
      setFilteredCourses(data); // Initially show all courses
      console.log(response);
    };

    fetchData();
  }, []);

  const handleSearch = searchQuery => {
    const filtered = courses.filter(course =>
      course.course.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleAddCourse = course => {
    // Add each course individually to selectedCourses
    course.forEach(singleCourse => {
      setSelectedCourses(prevSelectedCourses => [...prevSelectedCourses, singleCourse]);
    });
  };

// Group courses by course title
const groupCoursesByTitle = courses => {
  const groupedCourses = {};
  courses.forEach(course => {
    if (!groupedCourses[course.course]) {
      groupedCourses[course.course] = [course];
    } else {
      groupedCourses[course.course].push(course);
    }
  });
  return groupedCourses;
};

const handleGenerateSchedules = () => {
  const groupedCourses = groupCoursesByTitle(selectedCourses);
  console.log("Grouped Courses for Schedule Generation:", groupedCourses);
  const schedules = generateSchedules(groupedCourses);
  console.log("Generated Schedules:", schedules);
  // Implement your schedule generation logic here or handle it as needed

  const newSchedules = generateSchedules(groupedCourses).map(schedule => copySchedule(schedule));
  setSchedules(newSchedules);
    setCurrentPage(0); // Reset to the first page of schedules
};

const groupedCourses = groupCoursesByTitle(filteredCourses);

function generateSchedules(groupedCourses) {
  // Convert grouped courses object to an array of arrays
  const coursesLists = Object.values(groupedCourses).map(group => group);
  let validSchedules = [];
  let currentSchedule = Array.from({ length: 8 }, () => Array(3).fill(null));

  function generateHelper(i, currentSchedule) {
    // Base case
    if (i === coursesLists.length) {
      validSchedules.push(copySchedule(currentSchedule));
      return;
    }

    for (let course of coursesLists[i]) {
      if (isCompatible(course, currentSchedule)) {
        let positionsToClear = [];
        // Place course in schedule
        currentSchedule[course.lecTime][course.lecDay] = course;
        positionsToClear.push([course.lecTime, course.lecDay]);

        if (course.labDay !== -1) {
          currentSchedule[course.labTime][course.labDay] = course;
          currentSchedule[course.labTime + 1][course.labDay] = course;
          positionsToClear.push([course.labTime, course.labDay], [course.labTime + 1, course.labDay]);
        }

        generateHelper(i + 1, currentSchedule);

        // Clear the course from the schedule
        positionsToClear.forEach(([time, day]) => {
          currentSchedule[time][day] = null;
        });
      }
    }
  }

  function isCompatible(course, currentSchedule) {
    if (course.labDay === -1) {
      return currentSchedule[course.lecTime][course.lecDay] === null;
    } else {
      return currentSchedule[course.lecTime][course.lecDay] === null &&
             currentSchedule[course.labTime][course.labDay] === null &&
             currentSchedule[course.labTime + 1][course.labDay] === null;
    }
  }

  function copySchedule(schedule) {
    return schedule.map(row => [...row]);
  }

  // Start the recursive helper function
  generateHelper(0, currentSchedule);
  return validSchedules;
}

const handlePageChange = (index) => {
  setCurrentPage(index);
};

function copySchedule(original) {
  const copy = Array.from({ length: 8 }, () => Array(7).fill(null));

  for (let i = 0; i < original.length; i++) {
      for (let j = 0; j < original[i].length; j++) {
          if (j === 0) {
              copy[i][0] = original[i][j];
              copy[i][2] = original[i][j];
          } else if (j === 1) {
              copy[i][1] = original[i][j];
              copy[i][3] = original[i][j];
          } else if (j === 2) {
              copy[i][4] = original[i][j];
              copy[i][5] = original[i][j];
          }
      }
  }

  return copy;
}


  return (
    <main>
      <div>
        <Navbar />
        <div className="flex flex-col w-full lg:flex-row">
          <div className="flex flex-col items-center">
            <div className="px-10">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="py-10">
              {Object.entries(groupedCourses).map(([courseTitle, courses]) => (
                <CourseCard key={courseTitle} courseTitle={courseTitle} courses={courses} onAdd={handleAddCourse}/>
              ))}
            </div>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="flex flex-col">
            <Pagination schedules={schedules} currentPage={currentPage} onPageChange={handlePageChange} />
            <Table schedule={schedules[currentPage]} />
              <div className="divider"></div>
              <div className="flex flex-row">
                <h1>Selected Courses</h1>
                <button className="btn btn-primary" onClick={handleGenerateSchedules}>Generate Schedules</button>
              </div>
              <SelectedCourses courses={selectedCourses} /> {/* Pass selected courses to SelectedCourses component */}
          </div>
        </div>
      </div>
    </main>
  );
}
