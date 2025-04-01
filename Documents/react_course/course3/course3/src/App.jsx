import "./App.css";

import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAdd from "./components/JournalAdd/JournalAdd";
import JournalForm from "./components/JournalForm/JournalForm";
import { useEffect, useState } from "react";

// const INITIAL_DATA = [
//   {
//     id: 1,
//     title: "Подготовка к обновлению курсов",
//     date: new Date(),
//     post: "Сегодня провёл весь день за...",
//   },
//   {
//     id: 2,
//     title: "Поход в годы",
//     date: new Date(),
//     post: "Думал, что очень много времени...",
//   },
// ];


const App = () => {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("data"));
    if(data){
      setItems(data.map(item =>({
        ...item, 
        date: new Date(item.date)
      })));
    }
  },[])

  useEffect(()=>{
    if(items.length){
      console.log('Post');
      localStorage.setItem('data', JSON.stringify(items));
    }
  },[items])
  

  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems,
      {
        title: item.title,
        date: new Date(item.date),
        post: item.post,
        id:
          oldItems.length > 0 ? Math.max(...oldItems.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAdd />
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
};

export default App;
