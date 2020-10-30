import 'package:convertisseur_devises/models/devise.dart';
import 'package:flutter/material.dart';

class ListeDevise extends StatefulWidget {
  Devise value;
  Function(Devise) onChanged;

  @override
  _ListeDeviseState createState() => _ListeDeviseState();

  ListeDevise({this.value, this.onChanged});
}

class _ListeDeviseState extends State<ListeDevise> {
  @override
  Widget build(BuildContext context) {
    return DropdownButton<Devise>(
        isExpanded: true,
        value: widget.value,
        onChanged: widget.onChanged,
        items: _buildDevicesItems());
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
