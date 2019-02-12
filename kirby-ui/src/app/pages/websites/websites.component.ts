import { Component, OnInit } from '@angular/core';
import { WebsiteCardComponent } from './../../components/website-card/website-card.component';
import { WebsiteService } from './../../services/websites/index';
import { Website } from './../../services/websites/interfaces'

@Component({
    templateUrl: './websites.component.html',
    styleUrls: ['./websites.component.scss']
})
export class WebsitesPageComponent implements OnInit {
    private allWebsites: Website[];
    public displayedWebsites: Website[] = [
        { name: 'moshe', url: 'http://moshe' },
        { name: 'moshe', url: 'http://moshe' },
        { name: 'moshe', url: 'http://moshe' },
        { name: 'moshe', url: 'http://moshe' },
        { name: 'moshe', url: 'http://moshe' },
    ];

    constructor(private websiteService: WebsiteService) { }

    private blaWebsites() {
        this.displayedWebsites = this.allWebsites.slice(0, 9);
    }

    ngOnInit() {
        // this.websiteService.getAll()
        //     .subscribe((websites: Website[]) => {
        //         this.allWebsites = websites;
        //         this.blaWebsites();
        //     });
    }
}
