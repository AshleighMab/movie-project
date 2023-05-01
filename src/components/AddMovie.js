
import React, { useState } from 'react';
import { Button, Modal, Input, Typography, Select } from 'antd';
import './MovieDetails.css'

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;


const AddMovieModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
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
        <Title level={4}>Title:</Title>
        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <Title level={4}>Duration:</Title>
        <Input placeholder="Duration" value={duration} onChange={e => setDuration(e.target.value)} />
        <Title level={4}>Starring:</Title>
        <Input placeholder="Starring" value={starring} onChange={e => setStarring(e.target.value)} />
        <Title level={4}>Category:</Title>
        <Select style={{ width: 200 }} placeholder="Category" value={category} onChange={value => setCategory(value)}>
          <Option value="Action">Action</Option>
          <Option value="Comedy">Comedy</Option>
          <Option value="Drama">Drama</Option>
          <Option value="Musical">Musical</Option>
          <Option value="Thriller">Thriller</Option>
        </Select>
        <Title level={4}>Description:</Title>
        <TextArea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default AddMovieModal;


