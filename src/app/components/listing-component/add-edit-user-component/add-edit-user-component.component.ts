import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-edit-user-component',
  templateUrl: './add-edit-user-component.component.html',
  styleUrls: ['./add-edit-user-component.component.css']
})
export class AddEditUserComponent implements OnInit {
  onClose: any;
  usersForm: FormGroup;
  user: any = {};

  constructor(
    private formBuilder: FormBuilder,
    public modal: BsModalRef,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.initUsersForm();
    this.user && this.usersForm.patchValue(this.user);
  }
  // to add user to json file
  onAddUser() {
    this.userService.onAddUsers(this.usersForm.value).subscribe(res => {
      this.onClose(res);
    }), err => { }
  }
  // to edit user with id and new body data
  onSaveUser() {
    this.userService.onEditUsers(this.user.id, this.usersForm.value).subscribe(res => {
      this.onClose(res);
    }), err => { }
  }
  // to click on hidden upload input
  onUploadInput() {
    let input = document.getElementById('uploadInput');
    input.click();
  }
  // to upload photo and convert it to base64
  uploadPhoto(e) {
    if (e.target.files[0]) {
      this.getbase64(e.target.files[0]);
    }
  }
  // to convert image to base64 then sets image value in form to the converted base64 code
  getbase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.usersForm.get('image').setValue(reader.result);
    };
    reader.onerror = function (error) {
    };
  }
  // to init user form data
  initUsersForm() {
    this.usersForm = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      title: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
}
