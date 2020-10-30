import 'package:flutter/material.dart';

class BoutonContactezMoi extends StatelessWidget {
  static const purple = Color(0xffb74093);

  onClick(context) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Contactez-moi'),
            content: Text('Je suis joignable à l\'IMT Atlantique'),
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      child: Text(
        'Contactez-moi !',
        style: TextStyle(color: Colors.white),
      ),
      onPressed: () => onClick(context),
      color: purple,
    );
  }
}
