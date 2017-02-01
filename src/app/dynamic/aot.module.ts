import {NgModule} from "@angular/core";
import {AOTComponent} from "./aot.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AOTComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  exports: [
    AOTComponent
  ]
})
export class AOTModule {
}
