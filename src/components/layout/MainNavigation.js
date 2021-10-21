import styles from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Great quotes</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/quotes">All Quotes</NavLink>
          </li>
          <li>
            <NavLink to="/new-quote">Add Quote</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
