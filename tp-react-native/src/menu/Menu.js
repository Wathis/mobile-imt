import React from 'react'
import { View, StyleSheet } from 'react-native'
import OptionMenu from './OptionMenu'

/**
 * Composant Menu.
 */

export const toutes = 'Toutes';
export const actives = 'Actives';
export const terminees = 'Terminées';

const Menu = ({onPressFilterItem, currentFilter}) => (
    <View style={styles.menu}>
        <OptionMenu selected={toutes === currentFilter} title={toutes} onPress={() => onPressFilterItem(toutes)}/>
        <OptionMenu selected={actives === currentFilter} title={actives} onPress={() => onPressFilterItem(actives)}/>
        <OptionMenu selected={terminees === currentFilter} title={terminees} onPress={() => onPressFilterItem(terminees)}/>
    </View>
)

const styles = StyleSheet.create({
    menu: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    }
})
export default Menu