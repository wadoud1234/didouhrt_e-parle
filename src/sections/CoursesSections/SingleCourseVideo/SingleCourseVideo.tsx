import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
  FaRegSquareMinus,
  FaRegSquarePlus,
  FaRegSquareCheck,
  FaSquareCheck,
  FaYoutube,
  FaQuestion,
} from "react-icons/fa6";
import ReactPlayer from "react-player/youtube";
import { Courses_data } from "../../../utils/Courses_data";
import ResourceItem from "../../../components/ResourceItem/ResourceItem";
import "./SingleCourseVideo.css";
import QuizComponent from "../../../components/QuizComponent/QuizComponent";
import { useGlobalContext } from "../../../Providers/Context";
import Review from "../../../components/Review/Review";
import Note from "../../../components/Note/Note";
import { Quiz_Answer } from "../../../types/course.type";
import { Navigate } from "react-router-dom";
import { Note as NoteType } from "../../../types/note.type";

type ActiveTab = "note" | "avis" | "resource";

function SingleCourseVideo() {
  const { courseProgressCount, setCourseProgressCount } = useGlobalContext();
  const { courseId } = useParams();
  const CourseObject = Courses_data.find(
    (course) => course.id === parseInt(courseId as string)
  );
  const [openChapters, setOpenChapters] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [videoFinished, setVideoFinished] = useState<{
    [key: string]: boolean;
  }>({});
  const [activeTab, setActiveTab] = useState<ActiveTab>("note");
  const [isTabOpen, setIsTabOpen] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [activeQuizIndex, setActiveQuizIndex] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Quiz_Answer[]>([]);
  const reactPlayerRef = useRef<ReactPlayer>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  if (!CourseObject) return <Navigate to="/" />;
  useEffect(() => {
    localStorage.setItem(
      `courseProgress_${courseId}`,
      `${courseProgressCount}`
    );
  }, [courseProgressCount, courseId]);

  const handleSectionCompletion = () => {
    setCourseProgressCount(courseProgressCount + 1);
  };

  const toggleVideoFinished = (chapterIndex: number, videoIndex: number) => {
    setVideoFinished((prevVideoFinished) => {
      const key = `${chapterIndex}-${videoIndex}`;
      return {
        ...prevVideoFinished,
        [key]: !prevVideoFinished?.[key],
      };
    });
    handleSectionCompletion();
  };

  const toggleChapter = (chapterIndex: number) => {
    setOpenChapters((prevOpenChapters) => {
      return {
        ...prevOpenChapters,
        [chapterIndex]: !prevOpenChapters[chapterIndex],
      };
    });
  };

  const toggleAnswer = (answer: Quiz_Answer | null) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      if (answer && prevSelectedAnswers.includes(answer)) {
        return [answer];
      } else {
        return [];
      }
    });
  };

  const chapter = CourseObject?.chapters[activeChapterIndex];
  const selectedVideo = chapter?.videos[activeVideoIndex ?? 0];

  useEffect(() => {
    if (iframeRef.current) {
      setOpenChapters((prevOpenChapters) => {
        return {
          ...prevOpenChapters,
          [activeChapterIndex]: true,
        };
      });

      if (selectedVideo) {
        const selectedVideoUrl = selectedVideo.url;
        iframeRef.current.src = `https://www.youtube.com/embed/${selectedVideoUrl}?autoplay=1&rel=0`;
      }
    }
  }, [
    activeChapterIndex,
    activeVideoIndex,
    activeQuizIndex,
    selectedVideo,
    CourseObject,
  ]);

  const totalVideosAndQuiz = CourseObject.chapters.reduce((acc, chapter) => {
    acc += chapter.videos.length;
    if (chapter.quiz) {
      acc += 1;
    }
    return acc;
  }, 0);

  // const getFinishedVideos = () => {
  //   const finishedVideoKeys = Object.keys(videoFinished).filter(
  //     (key) => videoFinished[key as keyof typeof videoFinished]
  //   );
  //   return finishedVideoKeys;
  // };

  const getFinishedVideos = () => {
    return Object.entries(videoFinished ?? []).reduce((acc, [key, value]) => {
      if (value) {
        acc.push(key);
      }
      return acc;
    }, [] as string[]);
  };
  function getVideoUrl(): string {
    if (!selectedVideo) return "";
    return `https://www.youtube.com/embed/${selectedVideo.url}?autoplay=1&rel=0`;
  }
  // const checkedVideos = Object.values(videoFinished).filter(Boolean).length;
  const checkedVideos = getFinishedVideos();
  const num_of_checkedVideos = checkedVideos.length;
  const percentage = Math.round(
    (num_of_checkedVideos / totalVideosAndQuiz) * 100
  );

  useEffect(() => {
    setCourseProgressCount(percentage);
  }, [percentage, setCourseProgressCount]);

  const handleNoteClick = (note: NoteType) => {
    setActiveChapterIndex(note.chapterIndex);
    setActiveVideoIndex(note.SubChapterIndex);
  };

  let content: JSX.Element | null = null;
  if (activeTab === "note") {
    content = (
      <Note
        videoCurrentTime=""
        activeChapterIndex={activeChapterIndex}
        activeVideoIndex={activeVideoIndex ?? 0}
        selectedVideo={selectedVideo}
        chapter={chapter}
        onNoteClick={handleNoteClick}
      />
    );
  } else if (activeTab === "avis") {
    content = <Review />;
  } else if (activeTab === "resource") {
    content = CourseObject?.resources ? (
      <div className="flex flex_column gap1-2">
        {CourseObject.resources.map((res) => {
          return (
            <ResourceItem
              AllowDownload={true}
              key={res.id}
              fileName={res.fileName}
              url={res.url}
            />
          );
        })}
      </div>
    ) : (
      <p>support non disponible</p>
    );
  }

  const toggleTabBtn = (btn: ActiveTab) => {
    setActiveTab(btn);
  };
  const [videoUrl, setVideoUrl] = useState<string>(() => getVideoUrl());
  useEffect(() => {
    if (reactPlayerRef.current) {
      setOpenChapters((prevOpenChapters) => {
        return {
          ...prevOpenChapters,
          [activeChapterIndex]: true,
        };
      });

      if (selectedVideo) {
        setVideoUrl(() => getVideoUrl());
      }
    }
  }, [
    activeChapterIndex,
    activeVideoIndex,
    activeQuizIndex,
    selectedVideo,
    CourseObject,
  ]);
  return (
    <section className="flex flex_column singleCourseVideo_section">
      <div className="flex flex_column courseDisplay_container">
        <div className="courseDisplay_header flex_between flex_wrap gap1 pd1">
          <div className="flex flex_item_center gap1">
            <Link to={`/cours/${CourseObject.id}`}>
              <div className="flex_center courseDisplay_header_back_btn_container">
                <FaChevronLeft />
              </div>
            </Link>
            <h4>{CourseObject.name}</h4>
          </div>
          <span>
            Votre progression
            <b>{`${checkedVideos} / ${totalVideosAndQuiz}`}</b> (
            {courseProgressCount}%)
          </span>
        </div>
        <div className="courseDisplay_content">
          {!activeQuizIndex ? (
            // <iframe
            //   ref={iframeRef}
            //   className="courseDisplay_video"
            //   title="YouTube video player"
            //   width="100%"
            //   height="100%"
            //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            //   allowFullScreen
            // ></iframe>
            <ReactPlayer
              ref={reactPlayerRef}
              url={videoUrl}
              width={"100%"}
              // height={400}
              controls
              height={"65vh"}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <QuizComponent
              quiz={{
                started: quizStarted,
                name:
                  CourseObject.chapters[activeChapterIndex]?.quiz?.name ?? "",
                objective:
                  CourseObject.chapters[activeChapterIndex]?.quiz?.objective ??
                  "",
                questions:
                  CourseObject.chapters[activeChapterIndex]?.quiz?.questions ||
                  [],
              }}
              activeChapterIndex={activeChapterIndex}
              activeQuestionIndex={activeQuestionIndex}
              selectedAnswers={selectedAnswers}
              toggleAnswer={toggleAnswer}
              setQuizStarted={setQuizStarted}
              setActiveQuestionIndex={setActiveQuestionIndex}
              setSelectedAnswers={setSelectedAnswers}
            />
          )}
          <div
            className={`${
              isTabOpen ? "active_courseDisplayTab_container" : ""
            } container courseDisplayTab_container`}
          >
            <div className="tab_container  flex flex_column gap1">
              <div className="tab_btn_container pad_blk1 flex_between ">
                <div className="flex gap2">
                  <span
                    className={`${
                      activeTab === "note" ? "active_tab_btn" : ""
                    }`}
                    onClick={() => toggleTabBtn("note")}
                  >
                    note
                  </span>
                  <span
                    className={`${
                      activeTab === "avis" ? "active_tab_btn" : ""
                    }`}
                    onClick={() => toggleTabBtn("avis")}
                  >
                    avis
                  </span>
                  <span
                    className={`${
                      activeTab === "resource" ? "active_tab_btn" : ""
                    }`}
                    onClick={() => toggleTabBtn("resource")}
                  >
                    resource
                  </span>
                </div>
                <div
                  className="pointer"
                  onClick={() => setIsTabOpen(!isTabOpen)}
                >
                  {isTabOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              <div className="pad_blk1">{content}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="courseContent_container">
        <div className="courseContent_header pd1">
          <h4>Contenu du cours</h4>
        </div>
        <div className="flex flex_column">
          {CourseObject.chapters.map((chapter, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  toggleChapter(index);
                }}
                className={`chapter_title_container pointer flex_item_center gap1-2 
                  ${openChapters[index] ? "active_chapter" : ""}
                `}
              >
                {openChapters[index] ? (
                  <FaRegSquareMinus className="plus_minus_icon" />
                ) : (
                  <FaRegSquarePlus className="plus_minus_icon" />
                )}
                <h5>{chapter.name}</h5>
              </div>
              {openChapters[index] && (
                <div>
                  {chapter.videos.map((video, videoIndex) => (
                    <div
                      key={videoIndex}
                      className={`chapter_container pointer gap2 flex_between ${
                        activeChapterIndex === index &&
                        activeVideoIndex === videoIndex &&
                        activeQuizIndex === null
                          ? "active_video"
                          : ""
                      }`}
                      onClick={() => {
                        if (
                          (activeChapterIndex !== index ||
                            activeVideoIndex !== videoIndex) &&
                          activeQuizIndex === null
                        ) {
                          const selectedVideoUrl = video.url;
                          iframeRef.current!.src = `https://www.youtube.com/embed/${selectedVideoUrl}`;
                        }
                        setActiveChapterIndex(index);
                        setActiveVideoIndex(videoIndex);
                        setActiveQuizIndex(null);
                      }}
                    >
                      <div className="flex_center gap1-2">
                        <FaYoutube className="youtube_icon" />
                        <span className="flex1">{video.title}</span>
                      </div>
                      <div className="flex_center gap1-2">
                        <span>{video.duration}</span>{" "}
                        {/* Display formatted video duration */}
                        <div className="flex_center courseContent_chapter_check_btn_container">
                          {videoFinished?.[`${index}-${videoIndex}`] ? (
                            <FaSquareCheck
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVideoFinished(index, videoIndex);
                              }}
                            />
                          ) : (
                            <FaRegSquareCheck
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVideoFinished(index, videoIndex);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {chapter.quiz && (
                    <div
                      onClick={() => {
                        setActiveChapterIndex(index);
                        setActiveQuizIndex(index);
                        setActiveVideoIndex(null);
                      }}
                      className={`chapter_container pointer gap1-2 flex_between ${
                        activeChapterIndex === index &&
                        activeQuizIndex === index &&
                        activeVideoIndex === null
                          ? "active_video"
                          : ""
                      }`}
                    >
                      <div className="gap1-2 flex_item_center">
                        <FaQuestion className="youtube_icon" />
                        <span>
                          Quiz {index + 1} : {chapter.quiz.name}
                        </span>
                      </div>
                      <div className="courseContent_chapter_check_btn_container">
                        {videoFinished?.[`${index}-${chapter.quiz.name}`] ? (
                          <FaSquareCheck
                            onClick={(e) => {
                              e.stopPropagation();

                              // TODO
                              // toggleVideoFinished(index, chapter.quiz.name);
                            }}
                          />
                        ) : (
                          <FaRegSquareCheck
                            onClick={(e) => {
                              e.stopPropagation();

                              // TODO
                              // toggleVideoFinished(index, chapter.quiz.name);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SingleCourseVideo;
