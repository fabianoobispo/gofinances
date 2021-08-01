import React from 'react';
import { categories } from '../../utils/categories';

import {
  Container, 
  Title,
  Amount, 
  Footer,
  Category,
  Icon,
  CategoryName,
  Date

} from './styles';


export interface TransastionCardProps {
  transactionType: 'up' | 'down';
  name:string;
  amount: string;  
  category: string;
  date:string;
}
interface Props {
  data: TransastionCardProps 
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

export function TransastionCard({ data }: Props){
  const [category] = categories.filter(
    item => item.key === data.category
  );
  return (
    <Container>   
      <Title>{data.name}</Title>

      <Amount type={data.transactionType}>
        {data.transactionType === 'down' && '- '}
        {data.amount}
      </Amount>

  

      <Footer>
        <Category>   
        <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>

    </Container>
  )
} 
