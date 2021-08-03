import styled from 'styled-components/native';
import { Feather} from '@expo/vector-icons';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import { Platform} from 'react-native'
import { BorderlessButton} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import theme from '../../global/styles/theme';

interface CategoryProps{
isActive: boolean
}
export const Container = styled(GestureHandlerRootView)`
flex: 1;
background-color: ${({theme}) => theme.colors.background};

`;
export const Header = styled.View`
background-color: ${({theme}) => theme.colors.primary};

width:100%;


height: ${Platform.OS == 'ios'?
getStatusBarHeight() + RFValue(75) : RFValue(75)}px;



justify-content:center;
align-items:flex-start;
flex-direction: row;
padding-top: ${Platform.OS == 'ios'?
getStatusBarHeight() + RFValue(25) : RFValue(25)}px;
`;


export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(18)}px;
color: ${({theme}) => theme.colors.shape};
`;
export const BackButton = styled(BorderlessButton)`

`;


export const IconBack = styled(Feather)`
color: ${({theme}) => theme.colors.secondary};
font-size: ${RFValue(24)}px;
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
width: 100%;
padding: ${RFValue(15)}px;

flex-direction: row;
align-items:center;
background-color: ${({isActive}) =>
 isActive ? theme.colors.secondary_light : theme.colors.background};

`;

export const Icon = styled(Feather)`
font-size: ${RFValue(14)}px;
margin-right: 16px;
`;

export const Name = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
height: 1px;
width: 100%;
background-color: ${({theme}) => theme.colors.text};

`;
export const Footer = styled.View`
width: 100%;
padding: 24px;
`;

