import {Component, ElementRef, ViewChild, AfterViewInit} from "@angular/core";

@Component({
  selector: 'aot-component',
  templateUrl: './aot.component.html'
})

export class AOTComponent implements AfterViewInit {

  @ViewChild('container', {read: ElementRef})
  public container: ElementRef;

  ngAfterViewInit() {
    console.log('AOTComponent.container >');
    console.log(this.container); // <- undefined here!
  }
}
