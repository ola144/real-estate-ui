import { Component, Input } from '@angular/core';
import { IProperty } from '../../services/property/property';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-propert-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './propert-card.html',
  styleUrl: './propert-card.css',
})
export class PropertCard {
  @Input() property!: IProperty;
}
