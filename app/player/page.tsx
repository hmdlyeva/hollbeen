"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";

const Host = () => {
  const [nickname, setNickname] = useState("")
  const [headbones, setHeadbones] = useState<number[]>([]);
  // const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  // const [musicPlaying, setMusicPlaying] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   const newAudio = new Audio("/halloween.mp3");
  //   setAudio(newAudio);

  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       newAudio.pause();
  //       setMusicPlaying(false);
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     newAudio.pause();
  //     newAudio.currentTime = 0;
  //   };
  // }, []);

  // const playMusic = () => {
  //   audio
  //     ?.play()
  //     .then(() => {
  //       setMusicPlaying(true);
  //     })
  //     .catch((error) => {
  //       console.error("Audio play error:", error);
  //     });
  // };

  const playScreamSound = () => {
    const screamSound = new Audio("/scream.mp3");
    screamSound.play().catch((error) => {
      console.error("Audio play error:", error);
    });
  };

  const playLaughtSound = () => {
    const laughtSound = new Audio("/laught.mp3");
    laughtSound.play().catch((error) => {
      console.error("Audio play error:", error);
    });

      if (nickname) {
        const storedPlayers = localStorage.getItem('players');
        const players = storedPlayers ? JSON.parse(storedPlayers) : [];
  
        players.push(nickname);
  
        localStorage.setItem('players', JSON.stringify(players));
  
        router.push("/lobi")
      } else {
        alert('Lütfen bir nickname girin!');
      }

  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadbones((prev) => {
        const newSpiders = [...prev, Math.random() * window.innerWidth];
        return newSpiders.slice(-10);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles["host_page"]} halloween`}>
      <div className="container">
        <img src="/darkspider.png" alt="" className={styles["darkspider"]} />
        <div className={styles["host"]}>
          <div className={styles["host_page"]}>
            <h3 className={styles["password"]}>Room Id</h3>
            <input
              type="password"
              name="roomid"
              id="roomid"
              placeholder="create room id"
              onFocus={playScreamSound}
            />
            <br />
            <br />

            <h3 className={styles["nickname"]}>Nickname</h3>
            <input
              type="text"
              name="nickname"
              id="nickname"
              placeholder="nickname"
              onFocus={playScreamSound}
              onChange={(e)=>setNickname(e.target.value)}
            />

            <div className={styles["btns"]}>
              <button className="black" onClick={playLaughtSound}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={20} height={20}>
                  <path
                    fill="#ffffff"
                    d="M40.1 467.1l-11.2 9c-3.2 2.5-7.1 3.9-11.1 3.9C8 480 0 472 0 462.2L0 192C0 86 86 0 192 0S384 86 384 192l0 270.2c0 9.8-8 17.8-17.8 17.8c-4 0-7.9-1.4-11.1-3.9l-11.2-9c-13.4-10.7-32.8-9-44.1 3.9L269.3 506c-3.3 3.8-8.2 6-13.3 6s-9.9-2.2-13.3-6l-26.6-30.5c-12.7-14.6-35.4-14.6-48.2 0L141.3 506c-3.3 3.8-8.2 6-13.3 6s-9.9-2.2-13.3-6L84.2 471c-11.3-12.9-30.7-14.6-44.1-3.9zM160 192a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {headbones.map((left, index) => (
        <img
          key={index}
          src="/headbone.png"
          className={styles["headbone"]}
          style={{ left: `${left}px` }}
          alt="headbone"
        />
      ))}
    </div>
  );
};

export default Host;
