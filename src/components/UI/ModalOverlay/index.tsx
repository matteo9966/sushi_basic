import React, { Fragment } from 'react'
import ReactDOM from "react-dom";
import styles from './backdrop.module.css';
const root_element = document.getElementById('overlay')!;



export const Overlay:React.FC = (props) => {

  return <Fragment>{ReactDOM.createPortal(<div className={styles.backdroplayer}>{props.children}</div>,root_element)}

        </Fragment>
}
