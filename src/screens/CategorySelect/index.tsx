import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
    BackButton,
    IconBack

  } from './styles';
  
  interface Category {
    key: string;
    name: string;
  }
  
  interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
  }
  
  export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
  } : Props){

    function handleCategorySelect(category: Category){
      setCategory(category)
    }
    function handleLongCategorySelect(){
      setCategory({
        key: 'category',
        name: 'Categoria',
    })
  
    }

    
    return (
        <Container>
            <Header>
                  <BackButton onPress={closeSelectCategory}> 
                    <IconBack name="arrow-left"/>
                  </BackButton>

                  <Title>Categoria</Title>
            </Header>
        
            <FlatList
              data={categories}
              style= {{flex: 1, width: '100%'}}
              keyExtractor={(item) => item.key}
              renderItem={({item}) => (
                <Category
                  onPress={()=> handleCategorySelect(item)}
                  onLongPress={()=> handleLongCategorySelect()}
                  isActive={category.key === item.key}
                >
                  <Icon name={item.icon} />
                  <Name>{item.name}</Name>
                </Category>
              )}
              ItemSeparatorComponent={() => <Separator/>}

            />

            <Footer>
                <Button  title="Selecionar"
                onPress ={closeSelectCategory}
                />
            </Footer>

        </Container>

    )}