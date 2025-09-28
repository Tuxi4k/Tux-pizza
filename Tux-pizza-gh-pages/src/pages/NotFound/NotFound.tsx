import { useNavigate } from "react-router-dom";
import styles from "./notFound.module.scss";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.notFound}>
      <h1>404 Ничего не найдено :(</h1>
      <div
        onClick={() => navigate("/Tux-pizza")}
        className="button button--black"
      >
        <span>Вернуться назад</span>
      </div>
    </div>
  );
}
export default NotFound;
