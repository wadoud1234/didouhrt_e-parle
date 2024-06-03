import { Suspense, lazy } from "react";
import Hero from "../sections/HomeSections/Hero/Hero";
import PrimaryCta from "../sections/HomeSections/PrimaryCta/PrimaryCta";

const LazyExperience = lazy(
  () => import("../sections/HomeSections/Experience/Experience")
);
const LazyExploreCourse = lazy(
  () => import("../sections/HomeSections/ExploreCourse/ExploreCourse")
);
const LazyTestimonials = lazy(
  () => import("../sections/HomeSections/Testemonials/Testemonials")
);
const LazySecondaryCta = lazy(
  () => import("../sections/HomeSections/SecondaryCta/SecondaryCta")
);

const Home = () => {
  return (
    <div>
      <Hero />
      <PrimaryCta />
      <Suspense fallback={<div></div>}>
        <LazyExperience />
        <LazyExploreCourse />
        <LazyTestimonials />
        <LazySecondaryCta />
      </Suspense>
    </div>
  );
};

export default Home;
