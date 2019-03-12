import { Component, OnInit, Input } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { NotificationsService } from 'src/app/services/notifications';
import { CommentsService } from 'src/app/services/comments';
import { Comment } from 'src/app/services/comments/interfaces';

@Component({
    selector: 'comment-list',
    template: `
        <event-list title='תגובות' [events]="comments"></event-list>
    `,
})
export class CommentListComponent implements OnInit {
    public comments: EventNotification[] = [];
    @Input()
    public context: object;

    constructor(
        private notificationsService: NotificationsService,
        private commentsService: CommentsService,
    ) { }

    ngOnInit() {
        this.updateComments();
        this.notificationsService.getMessage<any>('comment')
            .subscribe((notification) => {
                if (notification.msg === 'comment posted') {
                    this.updateComments();
                }
            });
    }

    private updateComments() {
        this.commentsService.getByContext(this.context).subscribe((comments) => {
            this.comments = comments.map(this.commentToEventNotification);
        });
    }

    private commentToEventNotification(comment: Comment): EventNotification {
        return {
            id: comment.id,
            name: comment.message,
            description: `${comment.author.firstname} ${comment.author.lastname}`,
            isRead: comment.is_read,
        }
    }
} 
