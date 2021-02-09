import { Component, HostListener } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'awesome-pwa';
  public updateAvailable: boolean;

  public promptEvent;
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    e.preventDefault();
    this.promptEvent = e;
  }
  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(evt => {
      this.updateAvailable = true;
    });
  }

  public reload() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }

  public installPWA() {
    this.promptEvent.prompt();
  }

  public shouldInstall(): boolean {
    return !this.isRunningStandalone() && this.promptEvent;
  }

  public isRunningStandalone(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }

}
