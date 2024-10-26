"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [pumpkins, setPumpkins] = useState<number[]>([]);
  const [spiderags, setSpiders] = useState<number[]>([]);
  const [bats, setBats] = useState<number[]>([]);
  
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const newAudio = new Audio("/halloween.mp3");
    setAudio(newAudio);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        newAudio.pause();
        setMusicPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      newAudio.pause();
      newAudio.currentTime = 0;
    };
  }, []);

  const playMusic = () => {
    audio?.play().then(() => {
      setMusicPlaying(true);
    }).catch((error) => {
      console.error("Audio play error:", error);
    });
  };

  const playScreamSound = () => {
    const screamSound = new Audio("/scream.mp3");
    screamSound.play().catch((error) => {
      console.error("Audio play error:", error);
    });
    router.push("/player")
  };

  const playLaughtSound = () => {
    const laughtSound = new Audio("/laught.mp3");
    laughtSound.play().catch((error) => {
      console.error("Audio play error:", error);
    });
    router.push("/host")
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSpiders((prev) => {
        const newSpiders = [...prev, Math.random() * window.innerWidth];
        return newSpiders.slice(-10); 
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setPumpkins((prev) => {
          const newPumpkins = [...prev, Math.random() * window.innerWidth];
          return newPumpkins.slice(-10);
        });
      }, 1500);

      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setBats((prev) => {
          const newBats = [...prev, Math.random() * window.innerWidth];
          return newBats.slice(-10); 
        });
      }, 1500);

      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles["dashboard_page"]}>
       {!musicPlaying && (
        <button onClickCapture={playMusic} className={styles["fullscreen-button"]}>
        </button>
      )}
      
        <img
          src="/spider.png"
          alt=""
          width={500}
          height={300}
          className={styles["spider"]}
        />

        <img
          src="/darkspiderweb.webp"
          alt=""
          className={styles["darkspiderweb"]}
        />
      <div className="container">
     

        <div className={styles["dashboard"]}>
          <img src="/holbi.png" alt="" width={400} height={150} className={styles["mirror"]} />
          <div className={styles["dashboard_page"]}>
            <div className={styles["btns"]}>
              <button className="black" onClick={playScreamSound}>Player</button>
              <button className="orange" onClick={playLaughtSound}>Host</button>
            </div>
          </div>
        </div>
      </div>

      {pumpkins.map((left, index) => (
        <img
          key={index}
          src="/favicon.ico"
          className={styles["pumpkin"]}
          style={{ left: `${left}px` }}
          alt="pumpkin"
        />
      ))}

      {bats.map((left, index) => (
        <img
          key={index}
          src="/bat.png"
          className={styles["bat"]}
          style={{ left: `${left}px` }}
          alt="bat"
        />
      ))}

      {spiderags.map((left, index) => (
        <img
          key={index}
          src="/spiderag.png"
          className={styles["spiderag"]}
          style={{ left: `${left}px` }}
          alt="spiderag"
        />
      ))}
    </div>
  );
};

export default Dashboard;
