import {NgModule} from "@angular/core";
import {MainDynamicComponent} from "./dynamic.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MainDynamicComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  exports: [
    MainDynamicComponent
  ]
})
export class DynamicModule {
}
