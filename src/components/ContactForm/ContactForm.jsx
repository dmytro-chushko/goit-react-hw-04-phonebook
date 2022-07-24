import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

import { IoMdPerson, IoMdPersonAdd } from 'react-icons/io';
import { FaPhone } from 'react-icons/fa';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputNameId = nanoid();
  const inputNumberId = nanoid();

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const id = nanoid();

    onSubmit(id, name, number);
    reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor={inputNameId}>
        <p className={css.labelTitle}>Name</p>
        <IoMdPerson className={css.icon} />
        <input
          id={inputNameId}
          className={css.input}
          type="text"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={e => setName(e.currentTarget.value)}
        />
      </label>
      <label className={css.label} htmlFor={inputNumberId}>
        <p className={css.labelTitle}>Number</p>
        <FaPhone className={css.icon} />
        <input
          id={inputNumberId}
          className={css.input}
          type="tel"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={e => setNumber(e.currentTarget.value)}
        />
      </label>

      <button className={css.button} type="submit">
        <IoMdPersonAdd className={css.buttonIcon} size={16} />
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
