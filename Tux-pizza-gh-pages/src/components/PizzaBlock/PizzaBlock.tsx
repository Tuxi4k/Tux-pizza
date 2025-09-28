import { useState, useMemo } from "react";
import { useCart } from "@/hooks/useCart";

function PizzaBlock({
  title,
  price,
  sizes,
  types,
  id,
  imageUrl,
}: {
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  id: number;
  imageUrl: string;
}) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);

  const addItem = useCart((state) => state.addItem);
  const cartItems = useCart((state) => state.cartItems);

  const totalCount = useMemo(() => {
    return cartItems
      .filter(
        (item) =>
          item.id === id &&
          item.pizzaType === typeIndex &&
          item.pizzaSize === sizes[sizeIndex]
      )
      .reduce((sum, item) => sum + item.count, 0);
  }, [cartItems, id, typeIndex, sizeIndex, sizes]);

  const typeNames: string[] = ["тонкое", "традиционное"];

  return (
    <div className="pizza-block__section">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((element, index) => (
              <li
                key={element}
                className={index === typeIndex ? "active" : ""}
                onClick={() => setTypeIndex(index)}
              >
                {typeNames[element]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((element, index) => (
              <li
                key={index}
                className={index === sizeIndex ? "active" : ""}
                onClick={() => setSizeIndex(index)}
              >
                {element}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">
            от {+(price * (sizeIndex ? sizeIndex + 1 - 0.9 : 1)).toFixed(2)} ₽
          </div>
          <button
            className="button button--outline button--add"
            onClick={() =>
              addItem({
                pizzaImageUrl: imageUrl,
                pizzaSize: sizes[sizeIndex],
                pizzaTitle: title,
                pizzaType: typeIndex,
                price: +(price * (sizeIndex ? sizeIndex + 1 - 0.9 : 1)).toFixed(
                  2
                ),
                count: 1,
                id: id,
              })
            }
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{totalCount}</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
