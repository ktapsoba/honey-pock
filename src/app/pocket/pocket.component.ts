import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PocketDetailComponent } from './pocket-detail/pocket-detail.component';

/**
 * The Pocket component
 */
@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.less']
})
export class PocketComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  /**
   * Creates a new Pocket
   */
  createPocket(): void {
    this.openPocketDetailDialog(false, null);
  }

  /**
   * Opens the Pocket detail dialog
   *
   * @param isEdit whether a pocket is being edited or not
   * @param id the pocket id
   */
  private openPocketDetailDialog(isEdit: boolean, id: number): void {
    const dialogRef = this.dialog.open(PocketDetailComponent, {
      width: '800px',
      data: { pocketId: id, edit: isEdit }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('got result ' + result);
      }
    });
  }
}
