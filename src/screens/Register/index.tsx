import React, {useState} from 'react';
import {Modal, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import * as Yup from 'yup';
import uuid from 'react-native-uuid' ;
import {yupResolver} from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native'

import { Text, View } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Input } from '../../components/Forms/Input';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';


import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes

  } from './styles';
import { string } from 'yargs';

  interface FormData {
    name: string;
    amount: string;  
  }

  const schema = Yup.object().shape({
      name: Yup
      .string()
      .required('Nome é ogrigatorio.'),
      amount: Yup
      .number()
      .typeError('Informe um valor numerico.')
      .positive('O valor não pode ser negatico.')

  });
  

export function Register(){    
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen]= useState(false);
    const dataKey = '@gofinances:transactions';
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({resolver: yupResolver(schema)});

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData){
        if(!transactionType){
            return Alert.alert('Selecione o tipo de transação.')
        }
        if(category.key === 'category'){
            return Alert.alert('Selecione a categoria.')
        }

        const newTransaction = {
            id:String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
            date: new Date()
        }
        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data): [];

            const dataFormated = [

                ...currentData,
                newTransaction
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated))

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            });
            navigation.navigate('Listagem')
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possivel salvar")       
        }
    }


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                        name="name" 
                        control={control}                  
                        placeholder="Nome"
                        autoCapitalize="sentences"
                        autoCorrect={false}    
                        error={errors.name && errors.name.message}                
                        />
                        <InputForm
                        name="amount"       
                        control={control}          
                        placeholder="Preço"
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message}   
            
                        />

                        <TransactionsTypes>
                        <TransactionTypeButton 
                            type="up"
                            title="Entrada"
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                            type="down"
                            title="Saida"
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType === 'down'}
                    />

                        </TransactionsTypes>
                        <CategorySelectButton title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                        
                    </Fields>

                <Button  
                    title="Enviar"
                    onPress={handleSubmit(handleRegister)}
                />
                </Form>

                <Modal 
                visible={categoryModalOpen}>
                    <CategorySelect                 
                    category = {category}
                    setCategory= {setCategory}
                    closeSelectCategory= {handleCloseSelectCategoryModal}
                    
                />
                </Modal>

                
                
            </Container>
        </TouchableWithoutFeedback>
    )
}