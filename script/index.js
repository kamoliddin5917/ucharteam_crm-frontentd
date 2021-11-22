// HTML digi taglani oberadigon function
const findEl = (className) => document.querySelector(className);
// Tag yaratadigon function
const creatEl = (tag) => document.createElement(tag);

// Ul
const coursesUl = findEl(".box");
// Modals
const modalTeachers = findEl(".modal-teacher");
const modalGroups = findEl(".modal-group");
const modalTeachersBody = findEl(".modal-teacher_body");
const modalGroupsBody = findEl(".modal-group_body");
const modalStudentOl = findEl(".group-box");
const groupTeacherName = findEl(".group-teacher");
const groupExit = findEl(".modal-group_x");
const teacherExit = findEl(".modal-teacher_x");

(async () => {
  const json = await fetch("https://ucharteam.herokuapp.com/api/ucharteam");
  const { data } = await json.json();
  const courses = data.courses.filter(({ course_ref_id }) => !course_ref_id);
  const subCourses = data.courses.filter(({ course_ref_id }) => course_ref_id);

  courses.forEach((course) => {
    renderCourses(course, subCourses, data);
  });
})();

const renderCourses = (course, subCourses, data) => {
  const newLi = document.createElement("li");
  const newH1 = document.createElement("h1");
  const newUl = document.createElement("ul");

  newH1.textContent = course.course_name;
  newLi.className = "list";
  newUl.className = "list_ul";

  subCourses.forEach((subCourses) => {
    if (subCourses.course_ref_id === course.course_id) {
      const subcourseLi = document.createElement("li");
      subcourseLi.textContent = subCourses.course_name;
      subcourseLi.className = "list_ul-li";
      newUl.append(subcourseLi);

      subcourseLi.addEventListener("click", (event) => {
        modalTeachers.classList.add("modal-active");

        const modalH1 = creatEl("h1");
        const modalUl = creatEl("ul");

        modalH1.textContent = event.target.textContent;
        modalUl.className = "teacher-box";

        modalUl.innerHTML = " ";

        data.teachers.forEach((teacher) => {
          if (subCourses.course_id == teacher.teacher_ref_course) {
            const teacherLi = creatEl("li");
            const teacherH1 = creatEl("h1");
            const teacherUl = creatEl("ul");

            teacherLi.className = "teacher-list";
            teacherH1.textContent = `${teacher.teacher_firstname}  ${teacher.teacher_lastname}`;
            teacherUl.className = "teacher-list-ul";

            teacherLi.innerHTML = " ";

            data.groups.forEach((group) => {
              if (teacher.teacher_id == group.group_ref_teacher) {
                const teacherLiGroup = creatEl("li");
                teacherLiGroup.textContent = group.group_name;
                teacherLiGroup.className = "teacher-list-li";
                teacherUl.append(teacherLiGroup);

                teacherLiGroup.addEventListener("click", (evt) => {
                  modalGroups.classList.add("modal-active");
                  groupTeacherName.textContent = `${teacher.teacher_firstname} - ${evt.currentTarget.textContent}`;
                  data.students.forEach((student) => {
                    let num = 0;
                    if (group.group_id == student.student_group) {
                      num += 1;
                      const studentLi = creatEl("li");
                      const studentUl = creatEl("ul");
                      const studentLiN = creatEl("li");
                      const studentLiF = creatEl("li");
                      const studentLiL = creatEl("li");
                      const studentLiP = creatEl("li");
                      const studentLiD = creatEl("li");

                      studentLi.className = "group-list";
                      studentUl.className = "group-list_ul";
                      studentLiN.className = "group-list_li";
                      studentLiF.className = "group-list_li";
                      studentLiL.className = "group-list_li";
                      studentLiP.className = "group-list_li";
                      studentLiD.className = "group-list_li";

                      studentLiN.textContent = num;
                      studentLiF.textContent = student.student_firstname;
                      studentLiL.textContent = student.student_lastname;
                      studentLiP.textContent = student.student_pay;
                      studentLiD.textContent = student.student_date;

                      studentUl.append(
                        studentLiN,
                        studentLiF,
                        studentLiL,
                        studentLiP,
                        studentLiD
                      );
                      studentLi.append(studentUl);
                      modalStudentOl.append(studentLi);
                    }
                  });
                });
              }
            });

            teacherLi.append(teacherH1, teacherUl);
            modalUl.append(teacherLi);
          }
        });
        modalTeachersBody.append(modalH1, modalUl);
      });
    }
  });
  newLi.append(newH1, newUl);
  coursesUl.appendChild(newLi);
};

const modalExit = (evt) => {
  if (evt.target === modalTeachers || evt.target === teacherExit) {
    modalTeachers.classList.remove("modal-active");
  }
  if (evt.target === modalGroups || evt.target === groupExit) {
    modalGroups.classList.remove("modal-active");
  }
};

modalTeachers.addEventListener("click", modalExit);
modalGroups.addEventListener("click", modalExit);
