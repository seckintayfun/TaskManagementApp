import styles from "./Card.module.css";

const Card = ({ children, className }) => {
  return (
    <div className={`${styles.card} ${styles[className]}`}>{children}</div>
  );
};

export default Card;
