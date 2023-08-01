import React, { useState } from 'react';
import Card from './cards';
import InputText from '../inputText';

export default function Categorize() {
    const [categories,setCategories]=useState([]);
  return (
    <Card>
        <div>
            <InputText placeholder={'description'} label={'description'}  />

        </div>
        <div>
        Categories
            <div className='grid grid-cols-2 gap-4'>
            
            <InputText  />
            <InputText  />
            </div>
        </div>
      
    </Card>
  );
}
