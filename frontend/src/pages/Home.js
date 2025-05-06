import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/students';

function Home() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');

  const fetchStudents = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setStudents(data);
  };

  const addStudent = async () => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    setName('');
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchStudents();
  };

  useEffect(() => { fetchStudents(); }, []);

  return (
    <div>
      <h2>Students</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
      <button onClick={addStudent}>Add</button>
      <ul>
        {students.map(s => (
          <li key={s._id}>
            {s.name} <button onClick={() => deleteStudent(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

