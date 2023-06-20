import { EventEmitter, Injectable, Output } from '@angular/core';
import { Articulo } from '../models/articulo.models';

@Injectable({
  providedIn: 'root'
})
export class EmiterService {

  @Output() dispardorArticulo: EventEmitter<Articulo> = new EventEmitter();


}
