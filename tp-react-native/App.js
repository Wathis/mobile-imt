import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu, {actives, terminees, toutes} from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        actions: [],
        filterType: toutes
    };

    constructor(props) {
        super(props)
        this.onTermineAction = this.onTermineAction.bind(this);
        this.onSupprimerAction = this.onSupprimerAction.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        console.log('la saisie à changée', nouvelleSaisie);
        this.setState({ texteSaisie : nouvelleSaisie})
    }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerNouvelleAction() {
        console.log('Vous avez cliqué sur Valider !')
        this.state.actions.push({
            textValue: this.state.texteSaisie,
            isTermine: false,
        });
        this.setState({ texteSaisie : ""});
    }

    onTermineAction(actionIndex) {
        const actions = this.state.actions;
        actions[actionIndex].isTermine = !actions[actionIndex].isTermine;
        this.setState({});
    }
    onSupprimerAction(actionIndex) {
        this.state.actions.splice(actionIndex, 1);
        this.setState({});
    }

    filterActions() {
        const {actions, filterType} = this.state;
        if (filterType === toutes) {
            return actions
        } else if (filterType === actives) {
            return actions.filter((e) => !e.isTermine)
        } else if (filterType === terminees){
            return actions.filter((e) => e.isTermine)
        }
        return [];
    }

    onChangeFilter(filterType) {
        this.setState({
            filterType: filterType
        });
    }

    render() {
        const {texteSaisie, actions} = this.state;

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Entete/>
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)}/>
                    <ListeActions actions={this.filterActions()} onTermine={this.onTermineAction} onSupprimer={this.onSupprimerAction}/>
                    <BoutonCreer onValider={() => this.validerNouvelleAction()}/>
                </ScrollView>
                <Menu onPressFilterItem={this.onChangeFilter}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})