import { useState } from "react";
import styles from "./Switch.module.css";

const Switch = ({ initialState = false, onChange, disabled = false }) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    if (!disabled) {
      const newState = !isOn;
      setIsOn(newState);
      if (onChange) {
        onChange(newState);
      }
    }
  };

  return (
    <button
      className={`${styles.switch} ${isOn ? styles.on : styles.off} ${
        disabled ? styles.disabled : ""
      }`}
      onClick={handleToggle}
      disabled={disabled}
      aria-checked={isOn}
      role="switch"
    >
      <span className={styles.slider}></span>
    </button>
  );
};

export default Switch;
