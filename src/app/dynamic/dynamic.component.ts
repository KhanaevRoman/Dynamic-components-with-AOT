import {Component, Input, ViewContainerRef, ViewChild, ComponentRef, ComponentFactory, NgModule} from "@angular/core";
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
  providers: [],
  styleUrls: ['./dynamic.component.css'],
  templateUrl: './dynamic.component.html'
})
export class MainDynamicComponent {

  private container$: BehaviorSubject<ViewContainerRef> = new BehaviorSubject<ViewContainerRef>(null);
  private template$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public templateStr: string = `\<p\>Dynamic\<\/p\>\<aot-component\>AOT component\<\/aot-component\>`;

  @Input()
  public set template(template: string) {
    console.log('set template');
    this.template$.next(template);
  }

  public get template() {
    return this.template$.getValue();
  }

  @ViewChild('container', {read: ViewContainerRef})
  public set container(container: ViewContainerRef) {
    this.container$.next(container);
  }

  public get container() {
    return this.container$.getValue();
  }

  private componentRef: ComponentRef<IDynamicComponent>;

  constructor() {
    console.log('created');
    Observable.combineLatest(this.container$, this.template$.distinctUntilChanged(),
      (container, template) => !!container)
      .filter(ready => ready)
      .subscribe(() => this.build());
  }

  private build() {
    console.log('build');
    this.destroy();
    if (this.template) {
      let factory = this.createComponentFactory(this.template);
      this.componentRef = this.container.createComponent(factory);
    }
  }

  private destroy() {
    if (this.componentRef) {
      console.log('destroy');
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  ngOnDestroy() {
    this.destroy();
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
