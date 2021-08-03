import React, {useEffect, useState, useCallback}from 'react';
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransastionCard, TransastionCardProps } from '../../components/TransastionCard';
import { useTheme } from 'styled-components';

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
    LogoutButton,
    LoadContainer
 
  } from './styles';
import theme from '../../global/styles/theme';
import { isStyledComponent } from 'styled-components';

export interface DataListProps extends TransastionCardProps{
    id:string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
  }
  
  interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
  }
export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
    
    const theme = useTheme()

    function getLastTransactionDate(
      collection: DataListProps[],
      type: 'up' | 'down'
    ){
      const lastTransaction = new Date(
      Math.max.apply(Math, collection
      .filter(transaction => transaction.transactionType === type)
      .map(transaction => new Date(transaction.date).getTime())))
  
      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
    }
  

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

        const lastTransactionEntries = getLastTransactionDate(transactions, 'up');
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'down');
        const totalInterval = `01 a ${lastTransactionExpensives}`;
      
        setTransactions(transactionsFormatted);

        const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval
      }
    });

    setIsLoading(false);

    console.log(transactionsFormatted)

    }
    useEffect(() => {
     /*    const dataKey = '@gofinances:transactions';
        AsyncStorage.removeItem(dataKey);   */
        LoadTransactions()       
    },[]);

    useFocusEffect(useCallback(() => {
        LoadTransactions();
    },[]))

    return (
        
        <Container>
       
        {
          isLoading ?
          <LoadContainer>
            <ActivityIndicator
              size='large'
              color={theme.colors.primary}
            />
          </LoadContainer>
          :
          <>
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
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.lastTransaction}
            />
               <HighlightCard
                type='down'
                title="Saídas"
                amount={highlightData.expensives.amount}
                lastTransaction={highlightData.expensives.lastTransaction}
            />
               <HighlightCard
                type='total'
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction}
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

        </>
        }
        </Container>
    )
}
