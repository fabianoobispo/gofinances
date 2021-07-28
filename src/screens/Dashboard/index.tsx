import React from 'react';
import {Text} from 'react-native';
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
    Icon
  } from './styles';

export function Dashboard(){
    return (
        <Container>
        <Header>
        <UserWrapper>
            <UserInfo>
                <Photo
                    source={{ uri: 'https://avatars.githubusercontent.com/u/31293689?v=4'}}
                />
                <User>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>Rodrigo</UserName>
                </User>
            </UserInfo>
          <Icon name="power"/>
        </UserWrapper>
     
        </Header>
        <HighlightCard/>
   
        </Container>
    )
}
