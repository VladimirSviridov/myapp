import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  template: `
    <!-- <h1>Welcome {{user.name}} to {{title}}!</h1> -->
    <p>
    child works!
    </p>
  `,
  styles: ``
})
export class ChildComponent {
  @Input() title: string | undefined;

  @Input() user: any;
}
