import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false; // bind element property with class property

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen; // list to event click on the element directive is set on
  }
}
