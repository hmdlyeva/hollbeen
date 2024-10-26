"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
// import { useRouter } from "next/navigation";
const colors = ["#FFFFFF", "#333333", "#FF0000", "#FFA500", "#FF8C00", "#FF4500"];
const Lobi = () => {
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  }, []);
  return (
    <div className={styles["lobi_page"]}>
      <div className="container">
        <div className={styles["lobi"]}>
          <div className={styles["lobi_page"]}>
            <h2>Players</h2>
            <p>{players.length}</p>
            <div className={styles["players_section"]}>
              {players.map((nickname, index) => (
                <div  style={{ backgroundColor: colors[index % colors.length] }} className={styles["player_circle"]} key={index}>{nickname.slice(0,2)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobi;
