import { Pipe, PipeTransform } from '@angular/core';

/**
 * Módulo que agrupa los pipes personalizados usados en la aplicación para transformar datos.
 */

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  /**
   * Funcion que transforma el primer carácter de una cadena a mayúscula y el resto a minúscula.
   * @param value Texto a transformar, se espera que sea una cadena de caracteres.
   * @returns 
   */

  transform(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
