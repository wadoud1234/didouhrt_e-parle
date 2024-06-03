import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import { RiEditFill, RiDeleteBin6Fill } from "react-icons/ri";
import Modal from "../Modal/Modal";
import "./Note.css";
import { Chapter, Video } from "../../types/course.type";
import { Note as NoteType } from "../../types/note.type";
type Props = {
  activeChapterIndex: number;
  activeVideoIndex: number;
  selectedVideo: Video;
  videoCurrentTime: string;
  chapter: Chapter;
  onNoteClick: (note: NoteType) => void;
};
const Note = ({
  activeChapterIndex,
  activeVideoIndex,
  videoCurrentTime,
  selectedVideo,
  chapter,
  onNoteClick,
}: Props) => {
  const [Notes, setNotes] = useState<NoteType[]>([]);
  const [page, setPage] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedNote, setEditedNote] = useState("");
  const [editedNoteIndex, setEditedNoteIndex] = useState<number | null>(null);
  const [deleteNote, setDeletedNote] = useState<number | null>(null);
  const [noteFormData, setNoteFormData] = useState({
    note: "",
    time: "",
    chapterName: "",
    chapterIndex: "",
    subChapterName: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNoteFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (index: number) => {
    setEditMode(true);
    setEditedNote(Notes[index].note);
    setEditedNoteIndex(index);
  };

  const handleUpdate = () => {
    const updatedNotes = [...Notes];
    updatedNotes[editedNoteIndex!].note = editedNote;
    setNotes(updatedNotes);
    setEditMode(false);
    setEditedNote("");
    setEditedNoteIndex(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote = {
      note: noteFormData.note,
      time: videoCurrentTime,
      chapterName: chapter.name,
      subChapterName: selectedVideo.title,
      chapterIndex: activeChapterIndex,
      SubChapterIndex: activeVideoIndex,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setNoteFormData({
      ...noteFormData,
      note: "",
      time: "",
      chapterName: "",
      subChapterName: "",
    });
  };

  const handleDelete = (index: number) => {
    setDeletedNote(index);
  };

  const confirmDelete = () => {
    const updatedNotes = [...Notes];
    updatedNotes.splice(deleteNote!, 1);
    setNotes(updatedNotes);
    setDeletedNote(null);
  };

  const cancelDelete = () => {
    setDeletedNote(null);
  };

  useEffect(() => {
    deleteNote !== null
      ? document.body.classList.add("activeOverlay")
      : document.body.classList.remove("activeOverlay");
  }, [deleteNote]);

  const loadMoreData = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setPage(page + 6);
      setIsLoadingMore(false);
    }, 1000);
  };

  return (
    <div>
      <form className="review_form" onSubmit={handleSubmit}>
        <div>
          <input
            id="note"
            name="note"
            value={noteFormData.note}
            onChange={handleInputChange}
            placeholder="Partager votre note!"
            autoComplete="off"
          />
        </div>
        <button
          className={`flex_center review_submit_btn ${
            noteFormData.note.trim() !== "" ? "active_review_input" : ""
          }`}
          type="submit"
        >
          <FaLocationArrow />
        </button>
      </form>

      <div className="notes_container">
        {Notes.slice(0, page).map((note, index) => (
          <div
            key={index}
            className="pointer pad_blk1 flex flex_column single_review_container"
          >
            <div className=" review_user_info flex gap1">
              {/*   <div className="flex_center note_timing">
                <span>{note.time}</span>
              </div> */}
              <div className="flex_between flex1">
                <div
                  onClick={() => onNoteClick(note)}
                  className="flex flex_column "
                >
                  <h4>
                    {note.chapterIndex + 1}.{note.chapterName}
                  </h4>
                  <span>
                    {note.SubChapterIndex + 1}.{note.subChapterName}
                  </span>
                </div>
                <div className="flex_center gap1-2">
                  <button onClick={() => handleEdit(index)}>
                    <RiEditFill className="review_icons" />
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <RiDeleteBin6Fill className="review_icons" />
                  </button>
                </div>
              </div>
            </div>
            {editMode && editedNoteIndex === index ? (
              <form className="review_form">
                <div>
                  <input
                    type="text"
                    value={editedNote}
                    onChange={(e) => setEditedNote(e.target.value)}
                    className="updateInput"
                  />
                </div>
                <button
                  className={`flex_center review_submit_btn ${
                    editedNote.trim() !== "" ? "active_review_input" : ""
                  }`}
                  onClick={handleUpdate}
                >
                  <FaLocationArrow />
                </button>
              </form>
            ) : (
              <div className="flex_between gap1">
                <p className="margin_top1 note_text">{note.note}</p>
              </div>
            )}
          </div>
        ))}
        {Notes.length > 6 &&
          (isLoadingMore ? (
            <HashLoader
              className="margin_inline_auto pad_blk1"
              size={50}
              color={"#fa997b"}
              loading={isLoadingMore}
            />
          ) : (
            <button
              onClick={loadMoreData}
              className="margin_top1 secondary_btn"
            >
              <span>charger plus</span>
            </button>
          ))}
      </div>
      {deleteNote !== null && (
        <Modal
          title="Veuillez confirmer"
          content="Êtes-vous sûr de vouloir supprimer cette Note?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default Note;
