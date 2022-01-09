import {useState, useEffect } from 'react';
import { client } from '../client';
import { userQuery } from '../utils/data';

export const userInfo = () => {
    const [user, setUser] = useState();
    useEffect(() => {
        const users = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
        const query = userQuery(users?.googleId);

        client.fetch(query).then((data) => {
            setUser(data[0]);
        });      
    }, []);
    return user;
}