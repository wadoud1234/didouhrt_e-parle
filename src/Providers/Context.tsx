import React, {
  Context as ContextType,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import getStoredProgress from "../helpers/get-stored-progress";
import { useParams } from "react-router-dom";
type CourseProgressState = {
  courseProgressCount: number;
  setCourseProgressCount: React.Dispatch<React.SetStateAction<number>>;
};

const CustomContext = createContext<CourseProgressState | null>(null);

export const useGlobalContext = () =>
  useContext(CustomContext as ContextType<CourseProgressState>);

type Props = {
  children: ReactNode;
};

const Context = ({ children }: Props) => {
  const { courseId } = useParams();

  const [courseProgressCount, setCourseProgressCount] = useState<number>(
    courseId ? getStoredProgress(courseId) : 0
  );
  return (
    <CustomContext.Provider
      value={{ courseProgressCount, setCourseProgressCount }}
    >
      {children}
    </CustomContext.Provider>
  );
};
export default Context;
