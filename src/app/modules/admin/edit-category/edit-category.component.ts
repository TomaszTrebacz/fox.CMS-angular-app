import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  id: number;
  editCategoryForm: FormGroup;
  error: '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id'], 10);

    this.editCategoryForm = this.fb.group({
      id: [this.id, Validators.required],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  hasFormErrors(): boolean {
    return !this.editCategoryForm.valid;
  }

  onSubmit(): void {
    if (this.editCategoryForm.invalid) {
      return;
    }

    this.categoriesService
      .editCategory(this.editCategoryForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl(`/blog/category/${this.id}`);
          this.messageService.add({
            key: 'defaultToast',
            severity: 'success',
            summary: 'Successfully edited!',
            detail: `Your category has been edited!`,
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Error!',
            detail: error.message,
          });
        },
      });
  }
}
