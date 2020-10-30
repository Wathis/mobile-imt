import 'package:convertisseur_devises/models/devise.dart';
import 'package:convertisseur_devises/widgets/liste_devise.dart';
import 'package:convertisseur_devises/widgets/saisie_nombre.dart';
import 'package:flutter/material.dart';

import '../styles.dart';

class ConvertisseurDevisePage extends StatefulWidget {
  ConvertisseurDevisePage();
  @override
  State<StatefulWidget> createState() {
    return _ConvertisseurDevisePage();
  }
}

class _ConvertisseurDevisePage extends State<ConvertisseurDevisePage> {
  // les différents "états" de la page
  double _valeur; // valeur saisie
  Devise _deviseInitial; // devise initiale sélectionnée
  Devise _deviseFinale; // devise finale sélectionnée
  double _resultat; // le résultat de la conversion
  // définition des valeurs initiales
  @override
  void initState() {
    super.initState();
    _valeur = 0;
    _resultat = 0;
    _deviseInitial = Devise.EURO;
    _deviseFinale = Devise.DOLLAR;
  }

  calculate() {
    this.setState(() {
      _resultat = _valeur / taux[_deviseInitial] * taux[_deviseFinale];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(
      children: [
        Spacer(),
        Text(
          'Valeur',
          style: AppStyle.labelStyle,
        ),
        Spacer(),
        SaisieNombre(
          onChange: (saisie) {
            var valeurSaisie = double.parse(saisie);
            this.setState(() {
              _valeur = valeurSaisie;
            });
          },
        ),
        Spacer(),
        Text(
          'De',
          style: AppStyle.labelStyle,
        ),
        Spacer(),
        ListeDevise(
            value: _deviseInitial,
            onChanged: (devise) => {
                  this.setState(() {
                    _deviseInitial = devise;
                  })
                }),
        Spacer(),
        Text('Vers', style: AppStyle.labelStyle),
        Spacer(),
        ListeDevise(
            value: _deviseFinale,
            onChanged: (devise) => {
                  this.setState(() {
                    _deviseFinale = devise;
                  })
                }),
        Spacer(
          flex: 2,
        ),
        RaisedButton(onPressed: calculate, child: Text('Convertir')),
        Spacer(
          flex: 2,
        ),
        Text(_resultat.toString(), style: AppStyle.labelStyle),
        Spacer(),
      ],
    ));
  }

  List<DropdownMenuItem> _buildDevicesItems() {
    return Devise.values
        .map((devise) => DropdownMenuItem<Devise>(
              child: Text(devise.libelle),
              value: devise,
            ))
        .toList();
  }
}
