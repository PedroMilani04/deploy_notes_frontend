import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';
import './global.css';
import './sidebar.css';
import './main.css';
import Notes from './components/notes';
import RadioButton from './components/RadioButton';

function App() {

  const [selectedValue, setSelectedValue] = useState('all');
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [allNotes, setAllNotes] = useState([])


  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`)
    
    if(deletedNote) {
      setAllNotes(allNotes.filter(note => note._id !== id))
    }
  }

  async function handleChangePriority(id) {
    const note = await api.post(`/priorities/${id}`) 

    if(note && selectedValue !== 'all') {
      loadNotes(selectedValue);
    } else if (note) {
      getAllNotes();
    }
            
    
  }

  const getAllNotes = async () => {
    const response = await api.get('/annotations')

    setAllNotes(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false
    })

    setTitle('')
    setNotes('')

    if(selectedValue !== 'all') {
      getAllNotes()
    } 

    setSelectedValue('all')

    setAllNotes([...allNotes, response.data])
  }

  async function loadNotes(option) {
    const params = {
      priority: option
    }
    const response = await api.get('/priorities', { params })

    if(response) {
      setAllNotes(response.data)
    }
  }

  async function handleChange(e) {
    setSelectedValue(e.value)

    if(e.checked && e.value !== 'all') {
      loadNotes(e.value)
    } else {
      getAllNotes()
    }
  }

  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById('btn_submit')
      btn.style.background = '#FFD3CA'

      if(title && notes) {
        btn.style.background = '#EB8F7A'
      }
    }
    enableSubmitButton()
  }, [title, notes])


  useEffect(() => {
    
    getAllNotes()
  }, [])

  return (
    <div id="App">
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title" >Título da anotação</label>
            <input value={title} required maxLength="30" onChange={e => setTitle(e.target.value)}  />
          </div>
          <div className="input-block">
            <label htmlFor="content">Anotações</label>
            <textarea value={notes} required onChange={e => setNotes(e.target.value)} />
          </div>
          <button id='btn_submit' type="submit">Salvar</button>
        </form>
        <RadioButton 
          handleChangeapp={handleChange}
          selectedValueapp={selectedValue}

        />
      </aside>
      <main>
        <ul>
          {allNotes.map(data => (
            <Notes 
            key={data._id} 
            data={data} 
            handleDelete={handleDelete}
            handleChangePriority={handleChangePriority}
            />
          ))}

        </ul>
      </main>
    </div>
  );
}

export default App;
