import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry',
  template: `
    <p>
      entry works!
    </p>
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class EntryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
