import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
const parentElement = document.getElementById("overlay")!;

const BackdropLayer: React.FC<{ onClose: () => void }> = (props) => {
  return <div className={styles.backdroplayer} onClick={props.onClose}></div>;
};

const ModalOverlay: React.FC = ({ children }) => {
  return <div className={styles.modaloverlay}>{children}</div>;
};

export const Modal: React.FC<{ onClose: () => void }> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackdropLayer onClose={props.onClose}></BackdropLayer>,
        parentElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        parentElement
      )}
    </Fragment>
  );
};
