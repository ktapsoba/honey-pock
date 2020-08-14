import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { map, take, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Pocket } from '../pocket.model';
import { SavingFrequency } from '../saving-frequency.enum';
import { PocketService } from '../pocket.service';

/**
 * The Pocket detail component
 */
@Component({
  selector: 'app-pocket-detail',
  templateUrl: './pocket-detail.component.html',
  styleUrls: ['./pocket-detail.component.less']
})
export class PocketDetailComponent implements OnInit {
  actionName: string;
  pocketForm: FormGroup;
  frequencies: SavingFrequency[] = [
    SavingFrequency.WEEKLY,
    SavingFrequency.BIWEEKLY,
    SavingFrequency.MONTHLY,
    SavingFrequency.QUARTERLY,
    SavingFrequency.SEMIANNUALY,
    SavingFrequency.YEARLY
  ];

  /**
   * Creates a new instance of the Pocket detail component
   *
   * @param dialogRef the dialog reference object
   * @param data the data passed to the dialog
   * @param formBuilder the form builder
   */
  constructor(
    public dialogRef: MatDialogRef<PocketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private pocketService: PocketService
  ) {}

  /**
   * Initializes any objects when the component is created
   */
  ngOnInit() {
    if (!this.data.edit) {
      this.actionName = 'Create';
      const pocket: Pocket = new Pocket(
        0,
        '',
        '',
        0,
        10,
        1,
        SavingFrequency.BIWEEKLY,
        new Date(),
        null,
        false
      );
      this.initializeForm(pocket);
    }
  }

  /**
   * Initializes the pocket form from the given pocket
   *
   * @param pocket the pocket
   */
  initializeForm(pocket: Pocket): void {
    this.pocketForm = this.formBuilder.group({
      name: new FormControl(pocket.name, [Validators.required]),
      description: new FormControl(pocket.description),
      currentBalance: new FormControl(pocket.currentBalance, [
        this.checkCurrentBalance.bind(this)
      ]),
      targetBalance: new FormControl(pocket.targetBalance, [
        Validators.required,
        Validators.min(2),
        this.checkTargetBalance.bind(this)
      ]),
      savingAmount: new FormControl(pocket.savingAmount, [
        Validators.required,
        Validators.min(1),
        this.checkSavingAmount.bind(this)
      ]),
      savingFrequency: new FormControl(pocket.savingFrequency, [
        Validators.required
      ]),
      startDate: new FormControl(pocket.startDate, [Validators.required]),
      completionDate: new FormControl(pocket.completionDate),
      isCompleted: new FormControl(pocket.isCompleted)
    });

    this.currentBalance.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(_ => {
        this.targetBalance.updateValueAndValidity();
        this.savingAmount.updateValueAndValidity();
      });

    this.targetBalance.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(_ => {
        this.currentBalance.updateValueAndValidity();
        this.savingAmount.updateValueAndValidity();
      });

    this.savingAmount.valueChanges.pipe(distinctUntilChanged()).subscribe(_ => {
      this.currentBalance.updateValueAndValidity();
      this.targetBalance.updateValueAndValidity();
    });
  }

  get name() {
    return this.pocketForm.get('name');
  }

  get targetBalance() {
    return this.pocketForm.get('targetBalance');
  }

  get savingAmount() {
    return this.pocketForm.get('savingAmount');
  }

  get currentBalance() {
    return this.pocketForm.get('currentBalance');
  }

  /**
   * The action to be taken when the pocket is submitted
   *
   * @param pocket the pocket
   */
  onSubmit(pocket: Pocket): void {
    if (this.data.edit) {
      console.log('edit pocket');
    } else {
      this.pocketService.createPocket(pocket).then(data => {
        alert('created pocket');
        this.dialogRef.close();
      });
    }
  }

  checkTargetBalance(control: AbstractControl) {
    const targetBalance = control.value;
    const savingAmount = this.pocketForm
      ? this.pocketForm.get('savingAmount').value
      : 0.0;

    return targetBalance < savingAmount
      ? { targetBalanceLessThanSavingAmount: true }
      : null;
  }

  checkSavingAmount(control: AbstractControl) {
    const savingBalance = control.value;
    const targetBalance = this.pocketForm
      ? this.pocketForm.get('targetBalance').value
      : 0.0;

    return targetBalance < savingBalance
      ? { savingAmountMoreThanTargetBalance: true }
      : null;
  }

  checkCurrentBalance(control: AbstractControl) {
    const currentBalance = control.value;
    const targetBalance = this.pocketForm
      ? this.pocketForm.get('targetBalance').value
      : 0.0;

    return targetBalance < currentBalance
      ? { currentBalanceMoreThanTargetBalance: true }
      : null;
  }

  checkName(control: AbstractControl) {
    return this.pocketService
      .getPocketByName(control.value.toLowerCase())
      .valueChanges()
      .pipe(
        debounceTime(500),
        take(1),
        map(result => {
          console.log(result);
          return result.length > 0 ? { invalidName: true } : null;
        })
      );
  }
}
