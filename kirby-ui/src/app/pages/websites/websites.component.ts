import { Component, OnInit } from '@angular/core';
import { WebsiteCardComponent } from './../../components/website-card/website-card.component';
import { WebsiteService } from './../../services/websites/index';
import { Website } from './../../services/websites/interfaces'

@Component({
    templateUrl: './websites.component.html',
    styleUrls: ['./websites.component.scss']
})
export class WebsitesPageComponent implements OnInit {
    public websites: Website[];

    constructor(private websiteService: WebsiteService) { }

    ngOnInit() {
        this.websiteService.getAll()
            .subscribe((websites: Website[]) => {
                this.websites = websites;
            });
    }
}
