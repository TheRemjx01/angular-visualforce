# salesforce-ng5-remote

## Installation

To install this library, run:

```bash
$ npm install salesforce-ng5-remote --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install salesforce-ng5-remote
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { VisualforceModule } from 'salesforce-ng5-remote';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify your library as an import
    VisualforceModule.forRoot({
        apexController: 'SPA_HomePageCC'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```typescript
import { Component, OnInit } from '@angular/core';
import {RemoteAction, VisualforceService} from 'salesforce-ng5-remote';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _visualforce: VisualforceService) { }

  ngOnInit() {
    const myMethod = {
      name: 'helloWorld',
      apexController: 'SPA_HomePageCC'
    };
    const myMethod_2 = {
      name: 'helloWorldV2',
      apexController: 'SPA_HomePageCC'
    };
    const myMethod_3: RemoteAction = {
      name: 'helloWorldV3'
    };
    this._visualforce.fetch(myMethod).then(res => {
      console.log('Visualforce service: ', res);
    });
    this._visualforce.fetch(myMethod_2, 'Nghia').then(res => {
      console.log('Vsualforce service 2: ', res);
    });
    this._visualforce.fetch(myMethod_3, 'Nghia', 'Nguyen').then(res => {
      console.log('Visualforce service 3: ', res);
    });

  }

}
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Nghia Nguyen](mailto:remjx.is.me@gmail.com)
