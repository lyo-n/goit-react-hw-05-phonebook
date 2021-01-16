import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactList from './contacts/contacts';
import ContactForm from './contactForm/contactForm';
import Filter from './filter/filter';
import { Logo } from './logo/logo';
import  './app/app.module.css';
import Warn from './warningAlert/warningAlert';

export default class APP extends Component {
    static alertTimeoutHandle = 0;
    state = {
        contacts: [],
        filter: '',
        alert: '',
    };
    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);
    
        if (parsedContacts) {
          this.setState({ contacts: parsedContacts });
        }
    }
    componentDidUpdate(prevState) {
        const nextContacts = this.state.contacts;
        const prevContacts = prevState.contacts;
    
        if (nextContacts !== prevContacts) {
          localStorage.setItem('contacts', JSON.stringify(nextContacts));
        }
    }
    showAlert = message => {
        this.setState({ alert: message });
        clearTimeout(this.alertTimeoutHandle);
        this.alertTimeoutHandle = setTimeout(() => {
          this.setState({ alert: '' });
        }, 3000);
      };

    contactAdd = (quest) => {
        const searchName = this.state.contacts.map((ques) => ques.name).includes(quest.name);
        if (searchName) {
            this.showAlert(`${quest.name} already exists`);
        } else {
            const contact = {
                ...quest, id: uuidv4(),
            };
            
            this.setState((prevent) =>({
                contacts: [...prevent.contacts, contact],
            }));
        }   
    }; onFilter = (filter) => {
        this.setState({filter});
    };

    getContacts = () => {
        const {contacts, filter} = this.state;
        return contacts.filter((contacts) =>
        contacts.name.toLowerCase().includes(filter.toLowerCase())
        );
    };

    delContacts = (contactForId) => {
        this.setState((prevent) =>{
            return {
                contacts: prevent.contacts.filter(({id}) => id !== contactForId),
            };
        });
    };

    render () {
        const recorderContact = this.getContacts();
        const {filter, alert} = this.state;
        return (
            <div>
                <Logo/> {alert && <Warn title={alert}/>}<ContactForm addContact = {this.contactAdd}/>
                <h2>Contacts</h2>
                {(<Filter value={filter} changeFilter={this.onFilter}/>)}
                {recorderContact.length > 0 && (<ContactList contacts = {recorderContact} removeContact = {this.delContacts}/>)}
            </div>
        );
    }
}
