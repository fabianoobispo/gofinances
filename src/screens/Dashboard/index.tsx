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

interface highlightProps {
    amount: string
}
interface highlightData {
    entries: highlightProps;
    expensives: highlightProps;
    total: highlightProps
}

export function Dashboard(){
    const [transaction, setTransaction] = useState<DataListProps[]>([]);   
    const [highlightData, setHighlightData] = useState<highlightData>({} as highlightData);
 
    async function LoadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response =  await AsyncStorage.getItem(dataKey);          
        const transactions = response ? JSON.parse(response): [];
        
        let entriesSumTotal = 0;
        let expensiveTotal = 0;

        const transactionsDormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

            if(item.transactionType === 'up'){
                entriesSumTotal += Number(item.amount);
            }else{
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
      
        setTransaction(transactionsDormatted);

        const total = entriesSumTotal - expensiveTotal;
        setHighlightData({
            entries: {
                amount: entriesSumTotal.toLocaleString('pt-BR', {
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
                lastTransaction="última entrada dia 13 de julho"
            />
               <HighlightCard
                type='down'
                title="Saídas"
                amount={highlightData.expensives.amount}
                lastTransaction="última saída dia 13 de julho"
            />
               <HighlightCard
                type='total'
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction="01 á 29 de julho"
            />
          
        </HighlightCards>
        
        <Transastions>
            <Title>Listagem</Title>

            <TransastionsList 
                data={transaction}
                keyExtractor={item => item.id}
                renderItem={({item }) =>
                    <TransastionCard  data={item}/>
                }
            />
            
        
         
        </Transastions>
   
   
   

        </Container>
    )
}
