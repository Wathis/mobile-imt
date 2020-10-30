import 'package:flutter/material.dart';

import 'bouton_contactez_moi.dart';

void main() => runApp(MonApplication());

class MonApplication extends StatelessWidget {
  static const purple = Color(0xffb74093);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      color: purple,
      home: Scaffold(
          appBar: AppBar(
            backgroundColor: purple,
            title: Text('Bonjour App'),
          ),
          body: SingleChildScrollView(
            child: Column(
              children: [
                Center(
                  child: Text(
                    'Bonjour',
                    style: TextStyle(
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                        color: purple),
                  ),
                ),
                Text(
                  'Je suis Ross',
                  style: TextStyle(color: purple, fontSize: 20),
                ),
                Image.network(
                  "https://avatars3.githubusercontent.com/u/1372183?s=250&d=mm&r=x",
                  height: 350,
                ),
                BoutonContactezMoi(),
              ],
            ),
          )),
    );
  }
}
