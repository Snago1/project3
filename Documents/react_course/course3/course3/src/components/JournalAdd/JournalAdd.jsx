import CardButton from "../CardButton/CardButton";
import "./JournalAdd.css";

const JournalAdd = () => {
  return (
    <CardButton className="journal-add">
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Frame">
          <path
            id="Vector"
            d="M10 4.96265V16.6293"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M4.16669 10.796H15.8334"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
      Новое воспоминание
    </CardButton>
  );
};

export default JournalAdd;
