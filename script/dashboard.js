// HTML digi taglani oberadigon function
const findEl = (className) => document.querySelector(className);
// Tag yaratadigon function
const creatEl = (tag) => document.createElement(tag);

// Ul
const coursesUl = findEl(".box-course");
const teacherUl = findEl(".box-teachers");
const studentUl = findEl(".box-students");
// Modal course
const modalCourse = findEl(".js-modal-form-course");
const modalCourseTitle = findEl(".moddal-course-title");
const courseAddForm = findEl(".form-course-post");
const courseAddInputName = findEl(".input-course-name");
const courseAddInputPrice = findEl(".input-course-price");
const coursePutForm = findEl(".form-course-put");
const coursePutInputName = findEl(".input-course-name-put");
const coursePutInputPrice = findEl(".input-course-price-put");
const courseDelete = findEl(".form-course-delete");
// Modal student add
const modalStudent = findEl(".js-student-modal");
const modalStudentTitle = findEl(".modal-student-groupname");
const studentAddForm = findEl(".form-student-post");
const studentAddInputFname = findEl(".input-student-fname-post");
const studentAddInputLname = findEl(".input-student-lname-post");
const studentAddInputPay = findEl(".input-student-pay-post");
// Modal student put delete
const modalStudentPut = findEl(".js-student-modal-put");
const modalStudentTitlePut = findEl(".modal-student-groupname-put");
const studentPutForm = findEl(".form-student-put");
const studentPutInputFname = findEl(".input-student-fname-put");
const studentPutInputLname = findEl(".input-student-lname-put");
const studentPutInputPay = findEl(".input-student-pay-put");
const studentDelete = findEl(".form-student-delete");

const studentExit = findEl(".js-student_x");
const teacherExit = findEl(".modal-course_x");
const studentExitPut = findEl(".js-student_x-put");
(async () => {
  const json = await fetch("https://ucharteam.herokuapp.com/api/ucharteam");
  const { data } = await json.json();
  const courses = data.courses.filter(({ course_ref_id }) => !course_ref_id);
  const subCourses = data.courses.filter(({ course_ref_id }) => course_ref_id);

  courses.forEach((course) => {
    renderCourses(course, subCourses, data);
  });
  subCourses.forEach((course) => {
    renderTeachers(course, data);
  });
  data.groups.forEach((group) => {
    renderStudents(group, data);
  });
})();

const renderCourses = (course, subCourses, data) => {
  const newLi = document.createElement("li");
  const newH1 = document.createElement("h1");
  const newUl = document.createElement("ul");

  newH1.textContent = course.course_name;
  newLi.className = "list";
  newUl.className = "list_ul";

  newH1.addEventListener("click", (evt) => {
    modalCourse.classList.add("modal-active");
    modalCourseTitle.textContent = course.course_name;

    courseAddForm.addEventListener("submit", async (evt) => {
      evt.preventDefault();

      const newCourse = {
        course: courseAddInputName.value,
        price: courseAddInputPrice.value,
        id: course.course_id,
      };
      const json = await fetch(
        "https://ucharteam.herokuapp.com/api/dashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(newCourse),
        }
      );
      const data = await json.json();
      console.log(data);
      courseAddInputName.value = "";
      courseAddInputPrice.value = "";
      modalCourse.classList.remove("modal-active");
    });

    coursePutInputName.value = course.course_name;
    coursePutInputPrice.value = course.course_price;

    coursePutForm.addEventListener("submit", async (evt) => {
      evt.preventDefault();

      const newCourse = {
        course: coursePutInputName.value,
        price: coursePutInputPrice.value,
      };
      const json = await fetch(
        `https://ucharteam.herokuapp.com/api/dashboard/${course.course_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(newCourse),
        }
      );
      const data = await json.json();
      console.log(data);
      coursePutInputName.value = "";
      coursePutInputPrice.value = "";
      modalCourse.classList.remove("modal-active");
    });
    courseDelete.addEventListener("click", async () => {
      const json = await fetch(
        `https://ucharteam.herokuapp.com/api/dashboard/${course.course_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      const data = await json.json();
      console.log(data);
      modalCourse.classList.remove("modal-active");
    });
  });

  subCourses.forEach((subCourse) => {
    if (subCourse.course_ref_id === course.course_id) {
      const subcourseLi = document.createElement("li");
      subcourseLi.textContent = subCourse.course_name;
      subcourseLi.className = "list_ul-li";
      subcourseLi.dataset.id = subCourse.course_id;
      newUl.append(subcourseLi);

      subcourseLi.addEventListener("click", (event) => {
        modalCourse.classList.add("modal-active");
        modalCourseTitle.textContent = subCourse.course_name;

        courseAddForm.addEventListener("submit", async (evt) => {
          evt.preventDefault();

          const newCourse = {
            course: courseAddInputName.value,
            price: courseAddInputPrice.value,
            id: subCourse.course_id,
          };
          const json = await fetch(
            "https://ucharteam.herokuapp.com/api/dashboard",
            {
              method: "POST",
              headers: {
                "Content-Type": "Application/json",
              },
              body: JSON.stringify(newCourse),
            }
          );
          const data = await json.json();
          console.log(data);
          courseAddInputName.value = "";
          courseAddInputPrice.value = "";
          modalCourse.classList.remove("modal-active");
        });

        coursePutInputName.value = subCourse.course_name;
        coursePutInputPrice.value = subCourse.course_price;

        coursePutForm.addEventListener("submit", async (evt) => {
          evt.preventDefault();

          const newCourse = {
            course: coursePutInputName.value,
            price: coursePutInputPrice.value,
          };
          const json = await fetch(
            `https://ucharteam.herokuapp.com/api/dashboard/${subCourse.course_id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "Application/json",
              },
              body: JSON.stringify(newCourse),
            }
          );
          const data = await json.json();
          console.log(data);
          coursePutInputName.value = "";
          coursePutInputPrice.value = "";
          modalCourse.classList.remove("modal-active");
        });
        courseDelete.addEventListener("click", async () => {
          const json = await fetch(
            `https://ucharteam.herokuapp.com/api/dashboard/${subCourse.course_id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "Application/json",
              },
            }
          );
          const data = await json.json();
          console.log(data);
          modalCourse.classList.remove("modal-active");
        });
      });
    }
  });
  newLi.append(newH1, newUl);
  coursesUl.appendChild(newLi);
};
const renderTeachers = (course, data) => {
  const newTeacherLi = creatEl("li");
  const newTeacherH1 = creatEl("h1");
  const newTeacherUl = creatEl("ul");
  newTeacherLi.className = "list";
  newTeacherH1.textContent = course.course_name;
  newTeacherUl.className = "list_ul";

  data.teachers.forEach((teacher) => {
    if (teacher.teacher_ref_course === course.course_id) {
      const newTeacherLiT = creatEl("li");
      newTeacherLiT.className = "list_ul-li";
      newTeacherLiT.textContent = `${teacher.teacher_firstname} ${teacher.teacher_lastname}`;
      newTeacherUl.append(newTeacherLiT);

      newTeacherLiT.addEventListener("click", async () => {
        console.log(teacher.teacher_id);
      });
    }
  });

  newTeacherH1.addEventListener("click", async () => {
    console.log(course.course_id);
  });

  newTeacherLi.append(newTeacherH1, newTeacherUl);
  teacherUl.append(newTeacherLi);
};
const renderStudents = (group, data) => {
  const newStudentLi = creatEl("li");
  const newStudentH1 = creatEl("h1");
  const newStudentUl = creatEl("ul");

  newStudentLi.className = "list";
  newStudentH1.textContent = group.group_name;
  newStudentUl.className = "list-ul";

  const { course_id } = data.courses.find(
    (course) => course.course_id === data.teachers[0].teacher_ref_course
  );

  data.students.forEach((student) => {
    if (student.student_group === group.group_id) {
      const newStudentLiS = creatEl("li");
      newStudentLiS.className = "list_ul-li";
      newStudentLiS.textContent = `${student.student_firstname} ${student.student_lastname} - ${student.student_pay}`;
      newStudentUl.append(newStudentLiS);

      newStudentLiS.addEventListener("click", () => {
        modalStudentPut.classList.add("modal-active");
        modalStudentTitlePut.textContent = `${student.student_firstname} ${student.student_lastname}`;
        studentPutInputFname.value = student.student_firstname;
        studentPutInputLname.value = student.student_lastname;
        studentPutInputPay.value = student.student_pay;

        studentPutForm.addEventListener("submit", async (evt) => {
          evt.preventDefault();

          const newStudent = {
            firstName: studentPutInputFname.value,
            lastName: studentPutInputLname.value,
            pay: studentPutInputPay.value,
            course: course_id,
            group: group.group_id,
          };
          const json = await fetch(
            `https://ucharteam.herokuapp.com/api/student/${student.student_id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "Application/json",
              },
              body: JSON.stringify(newStudent),
            }
          );
          const studentData = await json.json();
          console.log(studentData);

          studentPutInputFname.value = "";
          studentPutInputLname.value = "";
          studentPutInputPay.value = "";
          modalStudentPut.classList.remove("modal-active");
        });
        studentDelete.addEventListener("click", async () => {
          const json = await fetch(
            `https://ucharteam.herokuapp.com/api/student/${student.student_id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "Application/json",
              },
            }
          );
          const data = await json.json();
          console.log(data);
          modalStudentPut.classList.remove("modal-active");
        });
      });
    }
  });
  newStudentH1.addEventListener("click", () => {
    modalStudent.classList.add("modal-active");
    modalStudentTitle.textContent = group.group_name;

    studentAddForm.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      const newStudent = {
        firstName: studentAddInputFname.value,
        lastName: studentAddInputLname.value,
        pay: studentAddInputPay.value || 0,
        course: course_id,
        group: group.group_id,
      };
      const json = await fetch("https://ucharteam.herokuapp.com/api/student", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(newStudent),
      });
      const studentData = await json.json();
      console.log(studentData);

      studentAddInputFname.value = "";
      studentAddInputLname.value = "";
      studentAddInputPay.value = "";

      modalStudent.classList.remove("modal-active");
    });
  });

  newStudentLi.append(newStudentH1, newStudentUl);
  studentUl.append(newStudentLi);
};

const modalExit = (evt) => {
  if (evt.target === modalCourse || evt.target === teacherExit) {
    modalCourse.classList.remove("modal-active");
  }
  if (evt.target === modalStudent || evt.target === studentExit) {
    modalStudent.classList.remove("modal-active");
  }
  if (evt.target === modalStudentPut || evt.target === studentExitPut) {
    modalStudentPut.classList.remove("modal-active");
  }
};

modalCourse.addEventListener("click", modalExit);
modalStudent.addEventListener("click", modalExit);
modalStudentPut.addEventListener("click", modalExit);
