import React from 'react';
import {StatusBar} from 'react-native';
import { HighlightCard } from '../../components/HighlightCard';

import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
 
  } from './styles';

export function Dashboard(){
    return (
        
        <Container>
            <StatusBar barStyle={'light-content'} />
        <Header>
        <UserWrapper>
            <UserInfo>
                <Photo
                    source={{ uri: 'https://avatars.githubusercontent.com/u/31293689?v=4'}}
                />
                <User>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>Fabiano</UserName>
                </User>
            </UserInfo>
          <Icon name="power"/>
        </UserWrapper>
     
        </Header>

        <HighlightCards>
            <HighlightCard
                type='up'
                title="Entradas"
                amount="R$ 17.400.00"
                lastTransaction="última entrada dia 13 de abril"
            />
               <HighlightCard
                type='down'
                title="Saídas"
                amount="R$ 1.400.00"
                lastTransaction="última saída dia 13 de abril"
            />
               <HighlightCard
                type='total'
                title="Total"
                amount="R$ 16.400.00"
                lastTransaction="01 á 13 de abril"
            />
          
        </HighlightCards>
      
   
        </Container>
    )
}
