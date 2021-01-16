import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './warningAlert.module.css';

const alertStyles= {
    appear: styles.appear,
    appearActive: styles.appearActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
  };

  const Warn = ({title}) => (
    <CSSTransition
    in={true}
    appear={true}
    timeout={250}
    classNames={alertStyles}
    unmountOnExit
  >
    <div className={(styles.alert, styles.alertDanger, styles.alertCustom)}>
      {title}
    </div>
  </CSSTransition>
);

export default Warn;