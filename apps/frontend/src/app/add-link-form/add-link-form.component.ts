import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { isURL } from 'class-validator';
import { LinkAdderService } from '../link-adder.service';

const urlValidator: ValidatorFn = (control: AbstractControl) => {
  return isURL(control.value) ? null : { invalidUrl: true };
};

@Component({
  selector: 'app-add-link-form',
  templateUrl: './add-link-form.component.html',
  styleUrls: ['./add-link-form.component.css'],
})
export class AddLinkFormComponent {
  linkInput = new FormControl('', [Validators.required, urlValidator]);

  buttonLabel = 'Shorten';

  isErrored = false;

  shouldTryAgain = false;

  isLoading = false;

  constructor(private linkAdder: LinkAdderService) {}

  onLinkInputChange() {
    if (!this.isLoading) this.buttonLabel = 'Shorten';
    if (this.isErrored && !this.linkInput.invalid) this.isErrored = false;
  }

  onSubmit() {
    if (this.buttonLabel === 'Copy') {
      window.navigator.clipboard.writeText(this.linkInput.value ?? '');
      return;
    }
    this.shouldTryAgain = false;
    if (this.linkInput.invalid || !this.linkInput.value) {
      this.isErrored = true;
      return;
    }
    this.isLoading = true;
    this.linkAdder.addLink(this.linkInput.value).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.linkInput.setValue(result);
        this.buttonLabel = 'Copy';
      },
      error: (error) => {
        this.isLoading = false;
        this.shouldTryAgain = true;
        console.log(error);
      },
    });
  }
}
