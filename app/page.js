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
  const [clearCourses, setClearCourses] = useState(false); // State to track if courses are cleared

  let preferredClassSlot = [];
  let preferredTiming = [];
  let part = 0;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/csvjson.json'); // Fetch data from data.json in the public directory
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

  const handleClearCourses = () => {
    setSelectedCourses([]); // Empty the selected courses list
    setSchedules([]); // Empty
    setClearCourses(prevState => !prevState); // Toggle clearCourses state
  };

  const handleCheckboxList = (checkedList) => {
    // Handle the list of checked checkboxes received from the Table component
    console.log("Checked checkboxes:", checkedList);
    preferredTiming = checkedList; // Extract the time from each item
  };

  const handleAddCourse = course => {
    // Add each course individually to selectedCourses
    course.forEach(singleCourse => {
      setSelectedCourses(prevSelectedCourses => [...prevSelectedCourses, singleCourse]);
    });
  };

  const handleCourseLockChange = (updatedCourses) => {
    const preferredClassSlots = updatedCourses.filter(course => course.locked).map(course => ({
      course: course.course,
      teacher: course.teacher,
      program: course.program,
      lecDay: course.lecDay,
      lecTime: course.lecTime,
      labDay: course.labDay,
      labTime: course.labTime
    }));
    // setPreferredTimeSlots(preferredTimeSlots);
    preferredClassSlot.push(preferredClassSlots);
    console.log("initialized preferredClassSlot", preferredClassSlot);
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
    console.log("preferred timing", preferredTiming);

    if (preferredClassSlot.length === 0 && preferredTiming.length === 0) {
      console.log("inside part 1")
      part = 1;
      const schedules = generateSchedules(groupedCourses);
      console.log("Generated Schedules:", schedules);
    } else if (preferredClassSlot.length !== 0 && preferredTiming.length === 0) {
      console.log("inside part 2")
      part = 2;
      let updatedChosenSubjects = [];
      updatedChosenSubjects = updateChosenSubjects(groupedCourses, preferredClassSlot); // Ensure chosenSubjects is an array of arrays
      // console.log("updated schedules", updatedChosenSubjects);
      const schedules = generateSchedules(groupedCourses);
      console.log("Generated Schedules:", schedules);
    } else if (preferredClassSlot.length === 0 && preferredTiming.length !== 0) {
      console.log("inside part 3")
      part = 3;
      // preferredTiming.forEach(time => {
      //   currentSchedule[time[0]][time[1]] = new Subject();
      // });
      const schedules = generateSchedules(groupedCourses);
      console.log("Generated Schedules:", schedules);
    } else {
      preferredClassSlot.forEach(course => {
        if (course.labDay === -1) {
          currentSchedule[course.lecTime][course.lecDay] = course;
        } else {
          currentSchedule[course.lecTime][course.lecDay] = course;
          currentSchedule[course.labTime][course.labDay] = course;
          currentSchedule[course.labTime + 1][course.labDay] = course;
        }
      });
      updateChosenSubjects();
      preferredTiming.forEach(time => {
        currentSchedule[time[0]][time[1]] = new Subject();
      });
      this.generateHelperwTimeSlots(0, currentSchedule);
    }

    // Implement your schedule generation logic here or handle it as needed

    const newSchedules = generateSchedules(groupedCourses).map(schedule => copySchedule(schedule));
    setSchedules(newSchedules);
    setCurrentPage(0); // Reset to the first page of schedules
  };

  const groupedCourses = groupCoursesByTitle(filteredCourses);

  const updateChosenSubjects = (groupedCourses, preferredClassSlot) => {
    // console.log("Initial preferredClassSlot:", preferredClassSlot);
    // console.log("Initial groupedCourses:", groupedCourses);

    // Iterate through each slot in preferredClassSlot
    for (let i = 0; i < preferredClassSlot.length; i++) {
      // Iterate through each object in the sub-array
      for (let j = 0; j < preferredClassSlot[i].length; j++) {
        const courseToRemove = preferredClassSlot[i][j].course;
        // console.log("Course to remove:", courseToRemove);

        // Check if the course name exists in groupedCourses and delete it
        if (groupedCourses.hasOwnProperty(courseToRemove)) {
          delete groupedCourses[courseToRemove];
          console.log(`Removed '${courseToRemove}' from groupedCourses.`);
        } else {
          console.log(`Course '${courseToRemove}' not found in groupedCourses.`);
        }
      }
    }
    // Log the final state of groupedCourses after all updates
    console.log("Final groupedCourses:", groupedCourses);
  };

  const blockSlots = (preferredTiming, currentSchedule) => {
    console.log("inside blockSlots");

    // Initialize an array to store [timeIndex, constDayIndex] pairs
    const timeDayPairs = [];

    // Iterate over each item in preferredTiming
    preferredTiming.forEach(item => {
      console.log("inside if")
      if (typeof item === 'string') { // Check if item is a string
        const [timeIndexStr, dayIndexStr] = item.split('-');
        const timeIndex = parseInt(timeIndexStr);
        let constDayIndex;

        // Determine constDayIndex based on the day string
        if (dayIndexStr === "Monday" || dayIndexStr === "Wednesday") {
          constDayIndex = 0;
        } else if (dayIndexStr === "Tuesday" || dayIndexStr === "Thursday") {
          constDayIndex = 1;
        } else {
          constDayIndex = 2;
        }

        // Push [timeIndex, constDayIndex] pair into the array
        console.log(timeIndex);
        console.log(constDayIndex);
        timeDayPairs.push([timeIndex, constDayIndex]);
      } else {
        console.log("else");
        console.error(`Invalid item type: ${typeof item}. Expected a string.`);
      }
    });

    console.log("Output array:", timeDayPairs);
    // You can use the currentSchedule here if needed
  };


  function generateSchedules(groupedCourses) {
    // Convert grouped courses object to an array of arrays
    const coursesLists = Object.values(groupedCourses).map(group => group);
    let validSchedules = [];
    // let currentSchedule = Array.from({ length: 8 }, () => Array(3).fill(null));
    let currentSchedule = [];
    if (part == 1) {
      currentSchedule = Array.from({ length: 8 }, () => Array(3).fill(null));
    } else if (part == 2) {
      currentSchedule = Array.from({ length: 8 }, () => Array(3).fill(null));
      console.log(groupedCourses);
      for (let i = 0; i < preferredClassSlot.length; i++) {
        // Iterate through each object in the sub-array
        for (let j = 0; j < preferredClassSlot[i].length; j++) {
          const courseToAdd = preferredClassSlot[i][j];
          console.log(courseToAdd);
          if (courseToAdd.labDay === -1) {
            currentSchedule[courseToAdd.lecTime][courseToAdd.lecDay] = courseToAdd;
          } else {
            currentSchedule[courseToAdd.lecTime][courseToAdd.lecDay] = courseToAdd;
            currentSchedule[courseToAdd.labTime][courseToAdd.labDay] = courseToAdd;
            currentSchedule[courseToAdd.labTime + 1][courseToAdd.labDay] = courseToAdd;
          }
        }
        console.log("current schedule", currentSchedule);
      }
    } else if (part == 3) {
      currentSchedule = Array.from({ length: 8 }, () => Array(3).fill(null));
      let slot = blockSlots(currentSchedule, preferredTiming);
      console.log(slot);
    }


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


  // return (
  //   <main>
  //     <div>
  //       <Navbar />
  //       <div className="flex flex-col w-full lg:flex-row">
  //         <div className="flex flex-col items-center">
  //           <div className="px-10">
  //             <SearchBar onSearch={handleSearch} />
  //           </div>
  //           <div className="py-0">
  //             {Object.entries(groupedCourses).map(([courseTitle, courses]) => (
  //               <CourseCard key={courseTitle} courseTitle={courseTitle} courses={courses} onAdd={handleAddCourse} />
  //             ))}
  //           </div>
  //         </div>
  //         <div className="divider lg:divider-horizontal"></div>
  //         <div className="flex flex-col">
  //           <Pagination schedules={schedules} currentPage={currentPage} onPageChange={handlePageChange} />
  //           <Table schedule={schedules[currentPage]} />
  //           <div className="divider"></div>
  //           <div className="flex flex-row">
  //             <h1>Selected Courses</h1>
  //             <button className="btn btn-primary" onClick={handleGenerateSchedules}>Generate Schedules</button>
  //           </div>
  //           <SelectedCourses courses={selectedCourses} /> {/* Pass selected courses to SelectedCourses component */}
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );

  return (
    <main>
      <div>
        <Navbar />
        <div className="grid grid-cols-12">
          <div className="flex flex-col lg:flex-row">
            <div>
              {/* Adjusting width of the first div */}
              <div className="col-span-2"> {/* Adjust col-span as needed */}
                <div className="py-10">
                  <SearchBar onSearch={handleSearch} />
                </div>
                <div className="py-0" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                  {Object.entries(groupedCourses).map(([courseTitle, courses]) => (
                    <CourseCard key={courseTitle} courseTitle={courseTitle} courses={courses} onAdd={handleAddCourse} clearCourses={clearCourses} />
                  ))}
                </div>
              </div>
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="col-span-2">
            <div className="flex flex-row items-center justify-between">
                <h1>Selected Courses</h1>
                <div>
                <button className="btn btn-primary mr-2" onClick={handleClearCourses}>Clear Courses</button>
                <button className="btn btn-primary" onClick={handleGenerateSchedules}>Generate Schedules</button>
                </div>
              </div>
              <div className="px-0">
                <SelectedCourses courses={selectedCourses} onCourseLockChange={handleCourseLockChange} />
              </div>
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="col-span-8">
              <Pagination schedules={schedules} currentPage={currentPage} onPageChange={handlePageChange} />
              <Table schedule={schedules[currentPage]} onCheckboxListChange={handleCheckboxList} />
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}
