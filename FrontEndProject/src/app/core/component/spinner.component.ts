import { Component } from "@angular/core";
import { NgClass, NgIf } from "@angular/common";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";

import { LoaderService } from "../service/loader.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  standalone: true,
  imports: [NgClass, NgIf]
})

export class SpinnerComponent {
  public isLoadingSpinnerActive: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private router: Router
  ) {
    this.loaderService.loading.subscribe((isVisible) => (this.isLoadingSpinnerActive = isVisible));

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoadingSpinnerActive = true;
      } else if (event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel) {
        setTimeout(() => {
          this.isLoadingSpinnerActive = false;
        }, 500);
      }
    });
  }
}
