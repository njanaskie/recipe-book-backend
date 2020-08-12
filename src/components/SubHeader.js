import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react'
import { useFirebaseContext } from '../../context/firebase-context'
import { startLogout } from '../actions/auth';

export const SubHeader = ({ startLogout }) => {
    const { isAdmin } = useFirebaseContext()

    return (
        <Menu >
            <Menu.Item as={NavLink} to='/dashboard' >Dashboard</Menu.Item>
            <Menu.Item as={NavLink} to='/pantry'>Pantry</Menu.Item>
            {isAdmin && <Menu.Item as={NavLink} to='/ingredients'>Ingredients</Menu.Item>}
            {isAdmin && <Menu.Item as={NavLink} to='/dishes'>Dishes</Menu.Item>}
            {isAdmin && <Menu.Item as={NavLink} to='/add-dish'>Add Dish</Menu.Item>}
            <Menu.Item><Button onClick={startLogout}>Logout</Button></Menu.Item>
        </Menu>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(SubHeader);