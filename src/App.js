import { useState } from "react";
import "./styles.css";

const customUseState = (initialState) => {
  let data = initialState;

  const callBack = (val) => {
    data = val;
  };

  return [data, callBack];
};

const initialState = {
  items: [
    { title: "item1", isChecked: true },
    { title: "item2", isChecked: true }
  ],
  newItems: [{ title: "item3", isChecked: false }]
};

export default function App() {
  const [data, setData] = useState(initialState);

  const handleChecked = (index) => {
    let oldData = data.items[index];
    let obj = oldData[index];
    obj.isChecked = !obj.isChecked;
    oldData[index] = obj;
    setData((prevState) => {
      return { ...prevState, items: oldData };
    });
  };

  const handleChecked2 = () => {};

  const handleMoveRight = () => {
    let transferAllowed = data.items.some((item) => item.isChecked === true);
    if (transferAllowed) {
      let itemsData = data.items.filter((item) => !item.isChecked);
      let newItemsData = data.items.filter((item) => item.isChecked);

      setData((prevState) => {
        return {
          ...prevState,
          items: itemsData,
          newItems: [...prevState.newItems, ...newItemsData]
        };
      });
    }
  };

  console.log(data);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div class="contents">
        <div class="left-list">
          <ul>
            {data.items.length > 0 &&
              data.items.map((item, index) => {
                return (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={item.isChecked}
                      onChange={() => handleChecked(index)}
                    />
                    {item.title}
                  </li>
                );
              })}
          </ul>
        </div>
        <div class="actions">
          <button
            onClick={handleMoveRight}
            // disabled={`${
            //   data.items.length > 0 &&
            //   !!data.items.some((item) => item.isChecked === true)
            // }`}
          >
            move right
          </button>
        </div>
        <div class="righ-list">
          <ul>
            {data.newItems.length > 0 &&
              data.newItems.map((item, index) => {
                return (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={item.isChecked}
                      onChange={handleChecked2}
                    />
                    {item.title}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
