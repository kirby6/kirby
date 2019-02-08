import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { PluginsService } from '../services/plugins';
import { Observable } from 'rxjs';

@Directive({
    selector: '[plugin]'
})
export class PluginsManagementDirective {
    @Input('plugin') set pluginName(pluginName: string) {
        this.isPluginEnabled(pluginName)
        .subscribe(isEnabled => {
            isEnabled ? this.show() : this.hide()
        });
    };
    
    constructor(private pluginsService: PluginsService,

        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
    }

    private show(): void {
        this.viewContainer.createEmbeddedView(this.templateRef);
    }

    private hide(): void {
        this.viewContainer.clear();
    }

    private isPluginEnabled(pluginName: string): Observable<boolean> {
        return this.pluginsService.getAvailablePlugins()
            .pipe(
                map((plugins: string[]) => plugins.some(plugin => plugin == pluginName))
            );
    }
}