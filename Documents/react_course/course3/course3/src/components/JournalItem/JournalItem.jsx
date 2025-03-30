import "./JournalItem.css";
// import moment from "moment";
function JournalItem({ title, date, post }) {
  const formattedDate = new Intl.DateTimeFormat("ru-RU").format(date);
  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <article className="journal-item__body">
        <div className="journal-item__date">{formattedDate}</div>
        <div className="journal-item__text">{post}</div>
      </article>
    </>
  );
}

export default JournalItem;
