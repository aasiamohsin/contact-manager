import React, { Fragment, useState } from 'react';
import { Contacts } from '../Contacts/Contacts';
import { AddContact } from '../Contacts/AddContact';

export const Home = () => {

    const [showForm, setShowFrom] = useState('');

    return (
        <Fragment>
            <div className = "add-form">
                <h2 style = {{color: 'white'}}>Contacts</h2>
                <h3 style = {{cursor: 'pointer', color: 'white'}} onClick = {() => setShowFrom(!showForm)}>
                    {
                        showForm ? <i className="fas fa-times"/> : <i className="fas fa-user-plus"/>
                    }
                </h3>
            </div>
            {
                showForm &&
                    <div>
                        <AddContact/>
                    </div>
            }
            <div>
                <Contacts/>
            </div>
        </Fragment>
    )
}