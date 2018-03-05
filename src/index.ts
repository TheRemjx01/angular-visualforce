import {NgModule, ModuleWithProviders, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualforceConfig, VisualforceService} from './visualforce.service';

@NgModule({
    imports: [CommonModule],
    providers: [VisualforceService]
})
export class VisualforceModule {
    constructor(@Optional() @SkipSelf() parentModule: VisualforceModule) {
        if (parentModule) {
            throw new Error('Visualforce module has already loaded. Import it in the app module only');
        }
    }

  static forRoot(visualforceConfig: VisualforceConfig): ModuleWithProviders {
      return {
          ngModule: VisualforceModule,
          providers: [
              {provide: VisualforceConfig, useValue: visualforceConfig}
          ]
      };
  }
}
