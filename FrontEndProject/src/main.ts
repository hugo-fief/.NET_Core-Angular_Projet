import { importProvidersFrom } from "@angular/core"
import { DatePipe } from "@angular/common"
import { provideRouter, Routes } from "@angular/router"
import { withInterceptorsFromDi, provideHttpClient, HttpClientModule } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { bootstrapApplication } from "@angular/platform-browser"

import { AppComponent } from "./app/app.component"

const routes: Routes = [
  {
    path: "",
    title: "Page d'accueil",
    providers: [DatePipe],
    loadComponent: () =>
      import("./app/app.component").then((module) => module.AppComponent),
  },
]

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(FormsModule, ReactiveFormsModule, HttpClientModule),
    provideRouter(routes)
  ],
}).catch((err) => console.error(err))
