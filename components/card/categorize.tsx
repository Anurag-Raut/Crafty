import React, { useState } from 'react';
import Card from './cards';
import InputText from '../inputText';
import { motion } from "framer-motion"
import Select from '../select';
export default function Categorize() {
  const [categories, setCategories] = useState(['']);
  const [categoriesItems, setCategoriesItems] = useState([{item:'',belongsTo:0}]);
  
  const handleChangeCategory = (index:number, newValue:string) => {
    const newCategories = [...categories];
    newCategories[index] = newValue;
    setCategories(newCategories);
  };
  const handleChangeCategoryItem = (index:number, item:string,belongsTo:number) => {
    const newCategoriesItem = [...categoriesItems];
    newCategoriesItem[index] = {item:item,belongsTo:belongsTo};
    setCategoriesItems(newCategoriesItem);
  };
  console.log(categoriesItems);
  return (
    <Card>
      <div>
        <InputText label={'description'} onChange={() => { }} />

      </div>
      <div>
        Categories
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4'>
          {
            categories?.map((item, index) => {
              return (
                <InputText key={index}  onChange={(e) => handleChangeCategory(index, e.target.value)} placeholder={'enter Category'} />
              )
            })
          }
             <div onClick={()=>{setCategories((prevState)=>[...prevState,''])}} className='flex items-center h-9  cursor-pointer my-2'>
              + Add Category
            </div>
          




        </div>

          <div>
            <div className='flex justify-between mx-6'>
            <p>Items</p>
            <p>Belongs to</p>

            </div>
           {
            categoriesItems.map(({item},index)=>{
              return(
                <div key={index} className='flex justify-between'>
                  <div className='max-w-md w-1/3'>
                    <InputText onChange={(e)=>{handleChangeCategoryItem(index,e.target.value,categoriesItems[index]['belongsTo'])}} label={`Item ${index+1}`}/>
                 
                  </div>
                  <div className='w-1/3'>
                  <Select onChange={(e)=>{handleChangeCategoryItem(index,categoriesItems[index]['item'],e.target.selectedIndex)}} options={categories} />
                  </div>
             
                </div>
              )
            })
           }
           <div className='cursor-pointer ' onClick={()=>{setCategoriesItems((prevState)=>[...prevState,{item:'',belongsTo:0}])}}>
            add Items
           </div>

           
          </div>


      </div>

    </Card>
  );
}
