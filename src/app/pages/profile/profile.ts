import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '../../services/auth/auth';
import { UserService } from '../../services/user';
import { toast } from 'ngx-sonner';

interface IProfile {
  name: string | undefined;
  role: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  photo: string | undefined;
  licenseNumber?: string | undefined;
  experience?: string | undefined;
  bio?: string | undefined;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
})
export class Profile {
  profileImage = signal('https://randomuser.me/api/portraits/men/32.jpg');

  authService = inject(Auth);
  userService = inject(UserService);

  get user() {
    return this.authService.user();
  }

  isEditing = signal(false);
  isLoading = signal(false);

  profile = signal<IProfile>({
    name: this.user?.name,
    role: this.user?.role,
    address: this.user?.address,
    phone: this.user?.phone,
    email: this.user?.email,
    photo: this.user?.photo,
    licenseNumber: this.user?.licenseNumber,
    experience: this.user?.experience,
    bio: this.user?.bio,
  });

  // Temporary form data
  formData: IProfile = {
    name: '',
    role: '',
    address: '',
    phone: '',
    email: '',
    photo: '',
    licenseNumber: '',
    experience: '',
    bio: '',
  };

  openEditProfile(): void {
    this.formData = {
      ...this.profile(),
    };

    this.isEditing.set(true);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
  }

  saveProfile(): void {
    this.isLoading.set(true);

    const payload =
      this.user?.role === 'agent'
        ? {
            name: this.formData.name,
            address: this.formData.address,
            photo: this.formData.photo,
            email: this.formData.email,
            phone: this.formData.phone,
            licenseNumber: this.formData.licenseNumber,
            experience: this.formData.experience,
            bio: this.formData.bio,
            role: this.profile().role,
          }
        : {
            name: this.formData.name,
            address: this.formData.address,
            photo: this.formData.photo,
            email: this.formData.email,
            phone: this.formData.phone,
            role: this.profile().role,
          };

    this.userService.updateUserDetails(payload).subscribe({
      next: (res) => {
        if (res.success) {
          toast.success(res.message || 'Details updated successfully!');
          this.isLoading.set(false);
          this.authService.currentUser.set(res.user);
          this.isEditing.set(false);
        }
      },
      error: (err) => {
        toast.success(err.error.message || 'Failed to update profile. Try again!');
        this.isLoading.set(false);
      },
    });
  }

  onChangePhoto(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      // this.profileImage.set(reader.result as string);

      this.formData.photo = reader.result as string;

      this.profile.update((prev) => ({
        ...prev,
        photo: reader.result as string,
      }));

      console.log(this.profile().photo);
    };

    reader.readAsDataURL(file);
  }
}
