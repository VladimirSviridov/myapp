import { Component, ComponentFactoryResolver, Injector, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { HostDirective } from './host.directive';
import { createCustomElement } from '@angular/elements';
import { HelloComponent } from './hello/hello.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HostDirective],
  template: `
    <div [class]="myclass" [style.color]="mycolor">sometext</div>
    <button (click)="load()">click me</button>
    <input (input)="load()">

    <hr>
    <div #host></div>
    <hr>
    <router-outlet />
  `,
  styles: [`
      .red {
        color: red;
      }
      .yellow {
        color: yellow;
      }
    `],
})
export class AppComponent {
  title = 'myapp';

  user = {
    name: 'Ivan'
  }

  myclass = 'red';

  mycolor: string | null = 'green';
  
  currrentFilter = 'active';

  users = [
    {name: 'Alex', status: 'active'},
    {name: 'Nick', status: 'deleted'},
  ];

  @ViewChild(HostDirective, { read: ViewContainerRef })
  hostView!: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver, 
              private view: ViewContainerRef,
              injector: Injector) {
    const helloElem = createCustomElement(HelloComponent, { injector });
    customElements.define('app-hello', helloElem);

    console.log(this.getFilteredUsers());
    
  }

  getFilteredUsers() {
    return this.users.filter((user) => {
      return user.status === this.currrentFilter;
    });
  }

  changeColor(color: string) {
    console.log(color);
    
    this.mycolor = color;
  }

  async load() {
    const {ChildComponent} = await import('./child/child.component');
    const ChildComponentFactory = this.cfr.resolveComponentFactory(ChildComponent);
    //this.view.createComponent(ChildComponentFactory);
    this.hostView.createComponent(ChildComponentFactory);
  }
}
