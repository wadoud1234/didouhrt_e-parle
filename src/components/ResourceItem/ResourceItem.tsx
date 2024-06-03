import {
  FaRegFileAlt,
  FaRegFileImage,
  FaRegFileAudio,
  FaRegFilePdf,
  FaFilePowerpoint,
} from "react-icons/fa";
import "./ResourceItem.css";

type Props = {
  fileName: string;
  url: string;
  AllowDownload?: boolean;
};

const ResourceItem = ({ fileName, url, AllowDownload }: Props) => {
  const splitted = fileName.split(".");
  const fileExtension = splitted[splitted.length - 1].toLowerCase() as string;

  const getIcon = (extension: string) => {
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
        return <FaRegFileImage />;
      case "mp3":
      case "wav":
        return <FaRegFileAudio />;
      case "pdf":
        return <FaRegFilePdf />;
      case "ppt":
        return <FaFilePowerpoint />;
      default:
        return <FaRegFileAlt />;
    }
  };

  return AllowDownload ? (
    <a href={url} target="_blank">
      <div className="flex_item_center gap1-2 pad_blk1-2 resource_container ">
        <span className="flex_center resource_icon">
          {getIcon(fileExtension)}
        </span>
        <span>{fileName}</span>
      </div>
    </a>
  ) : (
    <div className="flex_item_center gap1-2 pad_blk1-2 resource_container ">
      <span className="flex_center resource_icon">
        {getIcon(fileExtension)}
      </span>
      <span>{fileName}</span>
    </div>
  );
};

export default ResourceItem;
