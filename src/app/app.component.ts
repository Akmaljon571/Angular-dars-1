import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from './items/item.component';
import { IParam, Items } from './types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  items: Items[] = JSON.parse(localStorage.getItem('data') as string) || []
  total: number = this.items.reduce((total, item) => total + item.price, 0)
  modal: boolean = false

  totalCalculate(): void {
    this.total = this.items.reduce((total, item) => total + item.price, 0)
  }

  openModal(): void {
    this.modal = !this.modal
  }

  addElement(): void {
    const image = document.getElementById('image') as HTMLInputElement
    const title = document.getElementById('title') as HTMLInputElement
    const color = document.getElementById('color') as HTMLInputElement
    const ml = document.getElementById('ml') as HTMLInputElement
    const price = document.getElementById('price') as HTMLInputElement

    if (!image.value || !title.value || !color.value || !+ml.value || !+price.value) return alert('Error')
    const allData: Items[] = JSON.parse(localStorage.getItem('data') as string) || []

    const newObj: Items = {
      id: allData.length + 1,
      image: image.value,
      title: title.value,
      color: color.value,
      ml: +ml.value,
      price: +price.value,
      oldPrice: +price.value,
      count: 1
    }

    allData.push(newObj)
    localStorage.setItem('data', JSON.stringify(allData))
    this.openModal()
    this.items = allData
    this.totalCalculate()
  }

  remove(id: number): void {
    let allData: Items[] = JSON.parse(localStorage.getItem('data') as string) || []
    allData = allData.filter(e => e.id != id)
    localStorage.setItem('data', JSON.stringify(allData))
    this.items = allData
    this.totalCalculate()
  }
  
  removeAll(): void {
    localStorage.setItem('data', JSON.stringify([]))
    this.items = []
    this.totalCalculate()
  }

  count({ id, change }: IParam): void {
    const allData: Items[] = JSON.parse(localStorage.getItem('data') as string) || []

    const find = allData.find(e => e.id == id)

    if(!find) return

    if(change) {
      find.count += 1
      find.price += find.oldPrice
    } else {
      if(find.count) {
        find.count -= 1
        find.price -= find.oldPrice
      } else {
        find.count = 0
        find.price = 0
      }
    }

    const newData = allData.map(e => e.id == id ? find : e)
    localStorage.setItem('data', JSON.stringify(newData))
    this.items = newData
    this.totalCalculate()
  }
}
