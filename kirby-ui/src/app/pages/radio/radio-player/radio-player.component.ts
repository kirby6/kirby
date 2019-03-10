import { Component } from '@angular/core';

@Component({
    selector: 'radio-player',
    template: `
        <audio-player [src]="dirs" [loop]="true"></audio-player>
    `
})

export class RadioPlayerComponent {
    dirs = ["./../../../../assets/music/1.ogg"];
}