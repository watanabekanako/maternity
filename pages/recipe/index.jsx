import QuestionList from '../../components/questionList';
import Head from 'next/head';
import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import React, { useState, useEffect } from 'react';
export default function Recipe() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        'https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=1028091675260007192&categoryType=large'
      );
      const data = await response.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <DefaultLayout>
        <div>
          <ul>
            {users?.map((user) => (
              <li key={user.result}>{user.result}</li>
            ))}
          </ul>
        </div>
      </DefaultLayout>
    </>
  );
}
