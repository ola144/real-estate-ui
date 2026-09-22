import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../services/user';
import { form, required, FormField } from '@angular/forms/signals';
import { toast } from 'ngx-sonner';

interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  otherSubject: string;
  message: string;
}

@Component({
  selector: 'app-customer-contact',
  standalone: true,
  templateUrl: './contact.html',
  imports: [FormField],
})
export class CustomerContact {
  userService = inject(UserService);

  subjects = signal<string[]>([
    "I'm looking to buy",
    "I'm looking to rent",
    'I want to list a property',
    'Something else',
  ]);
  loading = signal<boolean>(false);

  contactModel = signal<IContact>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    otherSubject: '',
  });

  contactForm = form(this.contactModel, (path) => {
    required(path.firstName, {
      message: 'First name is required!',
    });
    required(path.lastName, {
      message: 'Last name is required!',
    });
    required(path.email, {
      message: 'Email is required!',
    });
    required(path.subject, {
      message: 'Subject is required!',
    });
    required(path.message, {
      message: 'Message is required!',
    });
  });

  sendMessage() {
    this.loading.set(true);

    const contact = this.contactModel();

    const payload = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      subject: contact.otherSubject ? contact.otherSubject : contact.subject,
      message: contact.message,
    };

    this.userService.sendContactMessage(payload).subscribe({
      next: (res) => {
        if (res.success) {
          toast.success(res.message || 'Contact sent successfully!');
          this.loading.set(false);
          this.contactModel.set({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: '',
            otherSubject: '',
          });
        }
      },
      error: (err) => {
        toast.error(err.message || 'Failed to contact the admin. Try again!');
        this.loading.set(false);
      },
    });
  }
}
