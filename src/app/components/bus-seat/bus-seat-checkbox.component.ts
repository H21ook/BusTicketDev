import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'bus-seat-checkbox',
  templateUrl: './bus-seat-checkbox.component.html',
  styleUrls: ['./bus-seat-checkbox.component.scss']
})
export class BusSeatCheckboxComponent implements OnInit {

  private image: string = '../../../assets/other/images/normal.svg';
  @Input() text: string;
  @Input() status: string = 'normal';
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Input() readonly: boolean = false;
  @Output() action = new EventEmitter();

  constructor(
  ) { }

  ngOnInit() {
    this.fillData();
  }

  private fillData() {

    if (this.readonly) {
      if (this.status == "normal")
        this.image = '../../../assets/other/images/normal.svg';
      else if (this.status == "special")
        this.image = '../../../assets/other/images/special.svg';
    }
    if (!this.disabled) {
      if (this.checked) {
        if (this.status == "normal")
          this.image = '../../../assets/other/images/normal_selected.svg';
        else if (this.status == "special")
          this.image = '../../../assets/other/images/special_selected.svg';
      } else {
        if (this.status == "normal")
          this.image = '../../../assets/other/images/normal.svg';
        else if (this.status == "special")
          this.image = '../../../assets/other/images/special.svg';
      }
    } else {
      if (this.status == "normal")
        this.image = '../../../assets/other/images/normal_disabled.svg';
      else if (this.status == "special")
        this.image = '../../../assets/other/images/special_disabled.svg';
    }
  }
  private toggle() {
    if (!this.disabled && !this.readonly) {
      this.checked = !this.checked;
      if (this.checked) {
        if (this.status == "normal")
          this.image = '../../../assets/other/images/normal_selected.svg';
        else if (this.status == "special")
          this.image = '../../../assets/other/images/special_selected.svg';
      } else {
        if (this.status == "normal")
          this.image = '../../../assets/other/images/normal.svg';
        else if (this.status == "special")
          this.image = '../../../assets/other/images/special.svg';
      }
      this.action.emit();
    }
  }
}
