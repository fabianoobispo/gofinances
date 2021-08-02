import React, {useEffect, useState, useCallback}from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransastionCard, TransastionCardProps } from '../../components/TransastionCard';

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
    Transastions,
    Title,
    TransastionsList,
    LogoutButton
 
  } from './styles';

export interface DataListProps extends TransastionCardProps{
    id:string;
}

interface HighlightProps {
    amount: string;
  }
  
  interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
  }
export function Dashboard(){
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
    
    async function LoadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response =  await AsyncStorage.getItem(dataKey);          
        const transactions = response ? JSON.parse(response): [];
        
        let entriesTotal = 0;
        let expensiveTotal = 0;
        console.log(response)
        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

            if(item.transactionType === 'up'){
                entriesTotal += Number(item.amount);
              }else {
                expensiveTotal += Number(item.amount);
              }


            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pr-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format( new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                transactionType: item.transactionType,
                category: item.category,
                date,
            }
              
            
        });
      
        setTransactions(transactionsFormatted);

        const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    });

    console.log(transactionsFormatted)

    }
    useEffect(() => {
        const dataKey = '@gofinances:transactions';
        AsyncStorage.removeItem(dataKey);  
        LoadTransactions()       
    },[]);

    useFocusEffect(useCallback(() => {
        LoadTransactions();
    },[]))

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
                    <UserName>Fabiano</UserName>
                </User>
            </UserInfo>
            <LogoutButton onPress={()=>{}}> 
                <Icon name="power"/>
            </LogoutButton>
        </UserWrapper>
     
        </Header>
      
        

        <HighlightCards>
            <HighlightCard
                type='up'
                title="Entradas"
                //amount={highlightData.entries.amount}
                amount="0,00"
                lastTransaction="última entrada dia 13 de julho"
            />
               <HighlightCard
                type='down'
                title="Saídas"
                //amount={highlightData.expensives.amount}
                amount="0,00"
                lastTransaction="última saída dia 13 de julho"
            />
               <HighlightCard
                type='total'
                title="Total"
                //amount={highlightData.total.amount}
                amount="0,00"
                lastTransaction="01 á 29 de julho"
            />
          
        </HighlightCards>
        
        <Transastions>
            <Title>Listagem</Title>

            <TransastionsList 
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({item }) =>
                    <TransastionCard  data={item}/>
                }
            />
            
        
         
        </Transastions>
   
   
   

        </Container>
    )
}
