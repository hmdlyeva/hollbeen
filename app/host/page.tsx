import React from 'react'
import styles from  "./style.module.scss"

const Host = () => {
  return (
   <div className={styles["host_page"]}>
    <div className="container">
        <div className={styles["host"]}>
            <div className={styles["host_page"]}>
                <h3>Room Id</h3>
                <input type="password" name="roomid" id="roomid" placeholder='create room id'/>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Host