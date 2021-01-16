import React from 'react';
import propTypes from 'prop-types';
import ContactItem from '../contactItem/contactItem'
import styles from './contacts.module.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const itemsStyles = {
    enter: styles.enter,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
}

const ContactList = ({contacts, removeContact}) => (
    <TransitionGroup component="ul">
       {contacts.map((contact) => (
        <CSSTransition key={contact.id} timeout={250} classNames={itemsStyles}>
           <ContactItem contact={contact} removeContact={removeContact} />
        </CSSTransition>
       ))} 
    </TransitionGroup>
);  

ContactList.propTypes = {
    removeContact: propTypes.func.isRequired,
    contacts: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
        number: propTypes.string.isRequired,
    })),
}

export default ContactList;
