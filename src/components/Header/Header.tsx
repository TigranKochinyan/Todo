import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./styles.module.scss";

export const Header: FC = () => {
  return (
    <header className={styles.root}>
      <NavLink
        className={({ isActive }) =>
          [
            isActive ? styles.activeLink : "",
            styles.link,
            styles.homePageLink,
          ].join(" ")
        }
        to="/"
      >
        Simple TODO app
      </NavLink>

      <NavLink
        to="/trash"
        className={({ isActive }) =>
          [isActive ? styles.activeLink : "", styles.link].join(" ")
        }
      >
        Trash
      </NavLink>
    </header>
  );
};
