function Categories({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}) {
  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((element, index) => (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? "active" : ""}
          >
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
