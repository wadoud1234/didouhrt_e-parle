import Faq from "../sections/AboutSections/Faq/Faq";
import OurHistory from "../sections/AboutSections/OurHistory/OurHistory";
import Statistics from "../sections/AboutSections/Statistics/Statistics";
import PageIntro from "../sections/CoursesSections/PageIntro/PageIntro";
const About = () => {
  return (
    <>
      <PageIntro location={"À propos"} navLink={"à_propos"} />
      <OurHistory />
      <Statistics />
      <Faq />
    </>
  );
};

export default About;
