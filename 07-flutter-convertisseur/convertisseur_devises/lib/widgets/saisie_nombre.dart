import 'package:flutter/material.dart';

import '../styles.dart';

class SaisieNombre extends StatefulWidget {
  Function(String) onChange;

  @override
  _State createState() => _State();

  SaisieNombre({this.onChange});
}

class _State extends State<SaisieNombre> {
  @override
  Widget build(BuildContext context) {
    return TextField(
      style: AppStyle.inputStyle,
      onChanged: widget.onChange,
    );
  }
}
