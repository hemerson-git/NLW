import styles from '../styles/components/ExperienceBar.module.css';

function ExperienceBar () {
  return (
    <>
      <header className={styles.experienceBar}>
        <span>0 XP</span>
        <div>
          <div style={{ width: '50%' }}></div>

          <span className={styles.currentExperience} style={{ left: '50%' }}>
            300XP
          </span>
        </div>
        <span>600 XP</span>
      </header>
    </>
  )
}

export default ExperienceBar;
