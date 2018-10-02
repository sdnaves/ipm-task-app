import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';

import { Hino } from '../../models/hino.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference
} from 'angularfire2/firestore';
import { SelecionaHinoPage } from '../seleciona-hino/seleciona-hino';


@IonicPage()
@Component({
  selector: 'page-hinario',
  templateUrl: 'hinario.html',
})
export class HinarioPage {
  hinosCollecion: AngularFirestoreCollection<Hino>;
  hinos: Observable<Hino[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private _loadingCtrl: LoadingController,

  ) { }

  ionViewWillEnter() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando Hinos...'
    });
    loading.present();

    this.hinosCollecion = this.db.collection<Hino>('/hinos',
      (ref: CollectionReference) => ref
        .orderBy('numero', 'asc')
        .orderBy('titulo', 'asc'));

    this.hinos = this.hinosCollecion.valueChanges()
    loading.dismiss();
  }
}