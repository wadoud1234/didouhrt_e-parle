import { useEffect, useState } from "react";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { Courses_data } from "../../../utils/Courses_data";
import "./AllCourses.css";
import { HashLoader } from "react-spinners";
import { CATEGORY } from "../../../types/course.type";

type Filter = CATEGORY | "all";

const AllCourses = () => {
  const [page, setPage] = useState(6);
  const [filterBtn, setFilterBtn] = useState<Filter[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreData = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setPage(page + 6);
      setIsLoadingMore(false);
    }, 1000);
  };

  useEffect(() => {
    const allCategories = Courses_data.map((item) => item.category);
    setFilterBtn(["all", ...new Set(allCategories)]);
  }, []);

  const filteredCourses =
    activeFilter === "all"
      ? Courses_data
      : Courses_data.filter((item) => item.category === activeFilter);
  const handleFilterClick = (filterBtn: Filter) => {
    setActiveFilter(filterBtn);
  };
  return (
    <section className="container">
      <div className="flex_center text_center flex_column ">
        <h2>Tous Les Cours</h2>
        <p>
          Explorez le savoir infini, découvrez votre potentiel - Parcourez nos
          cours dès maintenant! et apprenez sans limite avec e-Parle
        </p>
      </div>
      <div className="grid gap2 pad_blk4">
        <div className="filter_btn_container container  flex gap1">
          {filterBtn.map((filterBtn, index) => (
            <button
              key={index}
              className={
                activeFilter === filterBtn
                  ? "filter_btn active_filter_btn "
                  : "filter_btn"
              }
              onClick={() => handleFilterClick(filterBtn)}
            >
              <span>{filterBtn}</span>
            </button>
          ))}
        </div>
        <div className="allCourse_container flex gap1  flex_wrap">
          {filteredCourses.slice(0, page).map((item) => {
            return <CourseCard key={item.id} course={item} />;
          })}
        </div>
        {isLoadingMore ? (
          <HashLoader
            className=" margin_inline_auto pad_blk1"
            size={50}
            color={"#fa997b"}
            loading={isLoadingMore}
          />
        ) : (
          <button onClick={loadMoreData} className="primary_btn">
            <span>charger plus</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default AllCourses;
