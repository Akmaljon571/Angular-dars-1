import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Items } from '../types';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input() item!: Items
  @Output() removeEvent = new EventEmitter()
  @Output() countEvent = new EventEmitter()

  removeClick(id: number):void {
    this.removeEvent.emit(id)
  }

  countClick(id: number, change: boolean):void {
    this.countEvent.emit({id, change})
  }
}
