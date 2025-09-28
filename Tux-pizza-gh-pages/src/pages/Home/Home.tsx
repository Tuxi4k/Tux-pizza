import { useEffect, useMemo } from "react";
import { useItems } from "@/hooks/useItems";
import { useSort } from "@/hooks/useSort";

import "@/scss/app.scss";

import Categories from "@/components/Categories/Categories";
import Sort from "@/components/Sort/Sort";
import PizzaBlock from "@/components/PizzaBlock/PizzaBlock";
import PizzaBlockSkeleton from "@/components/PizzaBlock/PizzaBlockSkeleton";

import type { itemsInterface } from "@/utils/interfaces";

const sortFns = [
  (a: itemsInterface, b: itemsInterface) => b.rating - a.rating,
  (a: itemsInterface, b: itemsInterface) => a.price - b.price,
  (a: itemsInterface, b: itemsInterface) => a.title.localeCompare(b.title),
];

const apiUrl = import.meta.env.VITE_API_URL;

function Home() {
  const activeIndex = useSort((state) => state.activeIndex);
  const setActiveIndex = useSort((state) => state.setActiveIndex);
  const open = useSort((state) => state.open);
  const setOpen = useSort((state) => state.setOpen);
  const selected = useSort((state) => state.selected);
  const setSelected = useSort((state) => state.setSelected);

  const items = useItems((state) => state.items);
  const fetchJson = useItems((state) => state.fetchJson);

  useEffect(() => {
    fetchJson(apiUrl);
  }, [fetchJson]);

  const filteredItems = useMemo(
    () =>
      activeIndex
        ? items.filter((item) => item.category === activeIndex)
        : items,
    [items, activeIndex]
  );

  const sortedItems = useMemo(
    () => [...filteredItems].sort(sortFns[selected] || (() => 0)),
    [filteredItems, selected]
  );

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          <Sort
            open={open}
            setOpen={setOpen}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {sortedItems.length === 0
            ? Array.from({ length: 6 }, (_, index) => (
                <PizzaBlockSkeleton key={index} />
              ))
            : sortedItems.map((element) => (
                <PizzaBlock {...element} key={element.id} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
