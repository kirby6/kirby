import { Component, Input } from '@angular/core';
import { Website } from './../../services/websites/interfaces'

@Component({
    selector: 'website-card',
    templateUrl: './website-card.component.html',
    styleUrls: ['./website-card.component.scss']
})
export class WebsiteCardComponent {
    @Input()
    public website: Website;

    public onSiteClick() {
        window.open(this.website.url);
    }
}
