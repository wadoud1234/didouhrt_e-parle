import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PreLoader from "./components/PreLoader/PreLoader";
import Home from "./pages/Home";
import ProtectedLayout from "./Providers/ProtectedLayout";
import RootLayout from "./Providers/RootLayout";
import AuthProvider from "./Providers/AuthProvider";
import SSO_Callback_Page from "./pages/Auth/SSO_Callback";
import Redirect_If_Authentificated_Provider from "./Providers/Redirect_If_Authentificated_Provider";
import NotFound from "./components/Auth/NotFound/NotFound";

// const SharedLayout = lazy(() => import("./pages/SharedLayout"));
const Courses = lazy(() => import("./pages/Courses"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Auth/Login"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const SingleCoursePage = lazy(() => import("./pages/SingleCoursePage"));
const SingleCourseVideo = lazy(
  () => import("./sections/CoursesSections/SingleCourseVideo/SingleCourseVideo")
);

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PreLoader />}>
        <Routes>
          <Route element={<AuthProvider />}>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="/cours" element={<Courses />} />
              <Route path="/à_propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cours/:courseId" element={<SingleCoursePage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route element={<ProtectedLayout />}>
              <Route
                path="/cours/:courseId/videos"
                element={<SingleCourseVideo />}
              />
            </Route>
            <Route
              path="/auth"
              element={<Redirect_If_Authentificated_Provider />}
            >
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<SignUp />} />
              <Route path="/auth/sso" element={<SSO_Callback_Page />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
