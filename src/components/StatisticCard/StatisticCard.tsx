import "./StatisticCard.css";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  end: number;
  title: string;
};

const StatisticCard = ({ icon: Icon, end, title }: Props) => {
  return (
    <div className="flex_center gap1-2 statistic_card">
      <div className="statistic_icon">
        <Icon />
      </div>
      <div className="flex flex_column statistic_content">
        <h4>{end}</h4>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default StatisticCard;
