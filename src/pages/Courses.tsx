import AllCourses from "../sections/CoursesSections/AllCourses/AllCourses";
import PageIntro from "../sections/CoursesSections/PageIntro/PageIntro";
const Courses = () => {
  return (
    <>
      <PageIntro location={"Liste des cours"} navLink={"cours"} />
      <AllCourses />
    </>
  );
};

export default Courses;
