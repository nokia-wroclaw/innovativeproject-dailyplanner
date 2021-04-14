import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <div className={styles.Header}>
    <img
      className={styles.Image}
      src="https://media.discordapp.net/attachments/821426521859162192/821456504875646976/teams-chaos.png?width=800&height=450"
      alt="pic of daily planner"
    />
    <hr />
    <h5>
      <i>DailyPlanner</i>
    </h5>
  </div>
);

export default Header;
