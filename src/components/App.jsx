import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState, useEffect, useRef } from 'react';
import css from './App.module.css';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  const handleChange = e => {
    setFilter(e.currentTarget.value);
  };

  const handleSubmit = (id, name, number) => {
    const normalizeName = name.toLowerCase();
    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizeName)
    ) {
      Notify.failure('This name allready added');
      // alert('This name allready added');
      return;
    }
    setContacts(contacts => [{ id, name, number }, ...contacts]);
  };

  const handleDelete = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    if (localStorage.getItem('contacts')) {
      setContacts(JSON.parse(localStorage.getItem('contacts')));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2 className={css.title}>Contacts</h2>
      <Filter onChange={handleChange} filter={filter} />
      <ContactList
        contacts={contacts}
        filter={filter}
        onDeleteContact={handleDelete}
      />
    </div>
  );
};

export default App;
