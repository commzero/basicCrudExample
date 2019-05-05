import { Component, OnInit, TemplateRef } from '@angular/core';
import { AddEditUserComponent } from './add-edit-user-component/add-edit-user-component.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toaster } from "ngx-toast-notifications";
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';

@Component({
  selector: 'app-listing-component',
  templateUrl: './listing-component.component.html',
  styleUrls: ['./listing-component.component.css']
})
export class ListingComponent implements OnInit {
  modalRef: BsModalRef;
  users: UserModel;
  userId: number;
  userName: string;
  slice: number = 5;
  loading: boolean = false;

  constructor(
    private modalService: BsModalService,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
    private toaster: Toaster,
    private router: Router
  ) { }

  ngOnInit() {
    this.onGetAllUsers(this.slice);
  }
  // reusable function to open toaster, just send message and toaster type as a parameter
  // as per I tried to make a service for toaster but it kept throwing an error so I wrote the function here
  openToast(type, message) {
    this.toaster.open({
      duration: 2000,
      text: message,
      type: type
    })
  }
  // to show loading spinner and load user data
  onGetAllUsers(slice) {
    this.loading = true;
    this.spinner.show();
    this.userService.onGetUsers(slice).subscribe((res: UserModel) => {
      this.users = res;
      this.loading = false;
      this.spinner.hide();
    }), err => { }
  }
  // to open add user modal and it passes user data in case of edit
  onOpenAddEditModal(user?) {
    this.modalRef = this.modalService.show(AddEditUserComponent, { initialState: { user: user }, class: 'modal-sm' });
    this.modalRef.content.onClose = (res) => {
      if (res) {
        this.modalRef.hide();
        this.onGetAllUsers(this.slice);
        this.openToast('success', 'Success operation');
      } else {
        this.modalRef.hide();
        this.onGetAllUsers(this.slice);
        this.openToast('danger', 'Failed, please try again');
      }
    }
  }
  // to delete user, it opens modal to confirm
  onDeleteUser(template: TemplateRef<any>, user) {
    this.userId = user.id;
    this.userName = user.name;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  // to delete user from json file with id
  deleteUser() {
    this.userService.onDeleteUsers(this.userId).subscribe(res => {
      this.modalRef.hide();
      this.onGetAllUsers(this.slice);
      this.openToast('success', 'User Deleted Successfully');
    }), err => {
      this.openToast('danger', 'Failed, please try again');
    }
  }
  // to increase user results by 5 each time user scrolls down
  onScrollDown() {
    this.slice += 5;
    this.onGetAllUsers(this.slice);
  }
  // to navigate home
  onClickHome() {
    this.router.navigate(['home']);
  }
}
