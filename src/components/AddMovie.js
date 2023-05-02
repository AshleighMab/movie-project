
import React, { useState } from 'react';
import { Button, Modal, Input, Typography, Select } from 'antd';
import './MovieDetails.css'
import { useRoutes } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;


const AddMovieModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  // const {}=useRoutes()
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [starring, setStarring] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('Movie is being added');
    setConfirmLoading(true);

    const movie = { title, duration, starring, category, description };

    fetch('https://localhost:44311/api/services/app/Movie/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setOpen(false);
        setConfirmLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
        setModalText('Failed to add movie');
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <Button className='button' style={{ marginTop:"-5px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center",
      }} onClick={showModal}>
        Add Movie
      </Button>
      <Modal
        title="Add a new movie"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Title level={5}>Title:</Title>
        <Input  value={title} onChange={e => setTitle(e.target.value)} />
        <Title level={5}>Duration:</Title>
        <Input value={duration} onChange={e => setDuration(e.target.value)} />
        <Title level={5}>Starring:</Title>
        <Input value={starring} onChange={e => setStarring(e.target.value)} />
        <Title level={5}>Category:</Title>
        <Select style={{ width: 200 }}  value={category} onChange={value => setCategory(value)}>
          <Option value="Action">Action</Option>
          <Option value="Comedy">Comedy</Option>
          <Option value="Drama">Drama</Option>
          <Option value="Musical">Musical</Option>
          <Option value="Thriller">Thriller</Option>
        </Select>
        <Title level={5}>Description:</Title>
        <TextArea value={description} onChange={e => setDescription(e.target.value)} />
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default AddMovieModal;


