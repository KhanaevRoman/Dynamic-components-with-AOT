import {
  Component, Input, ViewContainerRef, ViewChild, ComponentRef, ComponentFactory, NgModule,
  AfterViewInit
} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {JitCompilerFactory} from "@angular/compiler";
import {AOTModule} from "./aot.module";

interface IDynamicComponent {
}

@Component({
  selector: 'dynamic',
  templateUrl: './dynamic.component.html'
})
export class MainDynamicComponent implements AfterViewInit {

  private template: string = `<p>Dynamic</p><aot-component>AOT component</aot-component>`;

  @ViewChild('container', {read: ViewContainerRef})
  container: ViewContainerRef;

  private componentRef: ComponentRef<IDynamicComponent>;

  ngAfterViewInit(){
    let factory = this.createComponentFactory(this.template);
    this.componentRef = this.container.createComponent(factory);
  }

  private createComponentFactory(template: string): ComponentFactory<IDynamicComponent> {

    @Component({template: template})
    class DynamicComponent implements IDynamicComponent {
    }

    @NgModule({
      declarations: [DynamicComponent],
      imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        AOTModule
      ]
    })
    class DynamicModule {
    }

    let compiler = new JitCompilerFactory([{useDebug: true, useJit: true}]).createCompiler();
    return compiler.compileModuleAndAllComponentsSync(DynamicModule)
      .componentFactories.find(factory => factory.componentType === DynamicComponent);

  }
}
