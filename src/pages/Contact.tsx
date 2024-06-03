import ContactForm from "../sections/ContactSections/ContactForm";
import PageIntro from "../sections/CoursesSections/PageIntro/PageIntro";
const Contact = () => {
  return (
    <>
      <PageIntro location={"Contact"} navLink={"contact"} />
      <ContactForm />
    </>
  );
};

export default Contact;
