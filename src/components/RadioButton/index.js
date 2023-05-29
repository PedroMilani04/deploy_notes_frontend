import * as React from 'react';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import './style.css'


export default function ColorRadioButtons({ handleChangeapp, selectedValueapp }) {


  return (
    <div className='radioOptions'>
      <div className=''>
        <Radio
          checked={selectedValueapp === 'all'}
          onChange={e => handleChangeapp(e.target)}
          value='all'
          sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }}
        />
        <span>Todos</span>
      </div><div className=''>
        <Radio
          checked={selectedValueapp === 'true'}
          onChange={e => handleChangeapp(e.target)}
          value='true'
          sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }}
        />
        <span>Prioridade</span>
      </div><div className=''>
        <Radio
          checked={selectedValueapp === 'false'}
          onChange={e => handleChangeapp(e.target)}
          value='false'
          sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }}
        />
        <span>Normal</span>
      </div>
    </div>
  );
}
