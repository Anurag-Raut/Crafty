import React, { useState } from 'react';
import Card from '../card/cards';
import InputText from '../inputText';
import { motion } from "framer-motion"
import Select from '../select';
import { useHook } from '@/hooks/reduxhook';
export default function Categorize({id}) {
  const {value:categories,handleChange:setCategories}=useHook(id,'categories');
  const {value:categoriesItems,handleChange:setCategoriesItems}=useHook(id,'categoriesItems');

  const {value:description,handleChange:setDescription}=useHook(id,'description')
  console.log(categories,'cat')

  
  const handleChangeCategory = (index:number, newValue:string) => {
    const newCategories = [...categories];
    
    newCategories[index] = newValue;
    setCategories(newCategories);
  };
  const handleChangeCategoryItem = (index:number, item:string,belongsTo:number) => {
    const newCategoriesItem = [...categoriesItems];
    newCategoriesItem[index] = {item:item,belongsTo:belongsTo};
    console.log(newCategoriesItem)
    setCategoriesItems(newCategoriesItem);
  };
  const handleAddCategory=()=>{
    let newCatogories=categories;
    if(!newCatogories){
      newCatogories=[''];
      setCategories(newCatogories)
    }
    else{
        
      newCatogories=[...categories,'']
      setCategories(newCatogories)
    }

  }
  const handleAddCategoryItems=()=>{
    let newCatogoriesItems=categoriesItems;
    if(!newCatogoriesItems){
      newCatogoriesItems=[{item:'',belongsTo:0}];
      setCategoriesItems(newCatogoriesItems)
    }
    else{
        
      newCatogoriesItems=[...categoriesItems,{item:'',belongsTo:0}]
      setCategoriesItems(newCatogoriesItems)
    }

  }
  console.log(categoriesItems);
  return (
    <Card>
      <div>
        <InputText value={description} label={'description'} onChange={(e) => { setDescription(e.target.value)}} />

      </div>
      <div>
        Categories
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4'>
          {
            categories?.map((item, index) => {
              return (
                <InputText key={index} value={item} onChange={(e) => handleChangeCategory(index, e.target.value)} placeholder={'enter Category'} />
              )
            })
          }
             <div onClick={handleAddCategory} className='flex items-center h-9  cursor-pointer my-2'>
              + Add Category
            </div>
          




        </div>

          <div>
            <div className='flex justify-between mx-6'>
            <p>Items</p>
            <p>Belongs to</p>

            </div>
           {
            categoriesItems?.map(({item,belongsTo},index)=>{
              return(
                <div key={index} className='flex justify-between'>
                  <div className='max-w-md w-1/3'>
                    <InputText value={item} onChange={(e)=>{handleChangeCategoryItem(index,e.target.value,categoriesItems[index]['belongsTo'])}} label={`Item ${index+1}`}/>
                 
                  </div>
                  <div className='w-1/3'>
                  <Select selectedIndex={belongsTo} onChange={(e)=>{handleChangeCategoryItem(index,categoriesItems[index]['item'],e.target.selectedIndex)}} options={categories} />
                  </div>
             
                </div>
              )
            })
           }
           <div className='cursor-pointer ' onClick={()=>{handleAddCategoryItems()}}>
            + Add Items
           </div>

           
          </div>


      </div>

    </Card>
  );
}
