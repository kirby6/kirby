import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventNotification } from 'src/app/components/event-list/interfaces';
import { NotificationsService } from 'src/app/services/notifications';
import { CommentsService } from 'src/app/services/comments';
import { Comment } from 'src/app/services/comments/interfaces';
import { AuthenticationService } from './../../services/authentication';
import { map } from 'rxjs/operators';

@Component({
    selector: 'comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
    public comments: Comment[] = [];
    @Input()
    public context: object;
    @Input()
    public receivingUserIds: string[];
    @Output()
    public onPost: EventEmitter<void> = new EventEmitter();

    constructor(
        private notificationsService: NotificationsService,
        private commentsService: CommentsService,
        private auth: AuthenticationService,
    ) { }

    ngOnInit() {
        this.updateComments();
        this.notificationsService.listen()
            .subscribe((notification) => {
                if (notification.context.msg === 'comment posted') {
                    this.updateComments();
                }
            });
    }

    public getCommentClass(comment: Comment) {
        return {
            "current-user-comment": comment.author.id == this.auth.currentUserValue.id,
        };
    }

    public postComment(message: string) {
        this.commentsService.post({
            context: this.context,
            message: message,
            author_id: this.auth.currentUserValue.id,
        }, this.receivingUserIds).subscribe((commentId) => {
            this.onPost.emit();
        });
    }

    private sortByDateAsc(comments) {
        return comments.sort((a, b) => a.post_date.$date > b.post_date.$date ? 1 : -1);
    }

    private updateComments() {
        this.commentsService.getByContext(this.context).pipe(
            map(this.sortByDateAsc)
        ).subscribe((comments) => {
            this.comments = comments;
        });
    }
} 
