import styles from "./Button.module.css";

const Button = ({ children, type, className, disabled, onClick }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[className]} ${
        disabled ? styles[disabled] : null
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
