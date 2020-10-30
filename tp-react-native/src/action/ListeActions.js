import React from 'react'
import {View, Text} from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({actions, onTermine, onSupprimer}) => {
    return (
        <View>
            {
                actions.map((action, i) => <UneAction key={i} action={action} onSupprimer={() => onSupprimer(action.id)} onTerminer={() => onTermine(action.id)}/>)
            }
        </View>
    )
}

export default ListeActions