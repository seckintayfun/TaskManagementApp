import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./Modal.module.css";

const Modal = ({ type, closeModal, onConfirm }) => {
  return (
    <>
      <div className={styles.backdrop} onClick={closeModal} />
      <div className={styles.content}>
        <Card>
          <p>Dou you confirm to {type} this task?</p>
          <div className={styles.modalActions}>
            <Button type="cancel" className="cancel" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" className="submit" onClick={onConfirm}>
              Proceed
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Modal;
