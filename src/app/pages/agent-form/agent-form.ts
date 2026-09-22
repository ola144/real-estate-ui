import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { agentLists } from '../../data/agents';
import { Country, Location } from '../../services/location/location';
import { Agent } from '../../services/agent/agent';
import { toast } from 'ngx-sonner';
import { IAgent } from '../../core/model/agent';
import { Loading } from '../../components/loading/loading';

@Component({
  selector: 'app-agent-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Loading],
  templateUrl: './agent-form.html',
})
export class AgentForm {
  router = inject(Router);
  route = inject(ActivatedRoute);
  locationService = inject(Location);
  agentService = inject(Agent);

  agentId = signal<string | null>('');

  agent = signal<IAgent>({
    id: '',
    _id: '',
    name: '',
    email: '',
    gender: '',
    role: 'agent',
    isActive: false,
  });

  isSubmitting = signal(false);
  loading = signal(false);

  coverPreview = signal<string | null>(
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1600&q=80',
  );

  avatarPreview = signal<string | undefined>('');

  // uploadedFiles = signal<File[]>([]);
  countries = signal<Country[]>([]);

  agentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      const id = param?.['id'];
      this.agentId.set(id);

      if (id) {
        this.getAgent(id);
      }
    });

    this.agentForm = this.fb.group({
      firstName: [
        this.agent()?.name.split(' ')[0] || '',
        [Validators.required, Validators.minLength(2)],
      ],

      lastName: [
        this.agent()?.name.split(' ')[1] || '',
        [Validators.required, Validators.minLength(2)],
      ],

      phone: [
        this.agent()?.phone || '',
        [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)],
      ],

      // dateOfBirth: [this.editedAgent()?.phone ? this.editedAgent()?.dateOfBirth : ''],

      gender: [this.agent().gender || '', Validators.required],

      email: [this.agent()?.email || '', [Validators.required, Validators.email]],

      // country: [this.editedAgent()?.country ? this.editedAgent()?.country : ''],
    });

    this.avatarPreview.set(this.agent()?.photo ?? '');

    // this.locationService.getCountries().subscribe({
    //   next: (res) => {
    //     this.countries.set(res.countries);
    //   },
    // });
  }

  getAgent(id: string) {
    this.loading.set(true);
    this.agentService.getAgent(id).subscribe({
      next: (res) => {
        this.agent.set(res.agent);
        const agent = res.agent;

        this.agentId.set(agent._id);

        this.agentForm = this.fb.group({
          firstName: [
            agent.name.split(' ')[0] || '',
            [Validators.required, Validators.minLength(2)],
          ],

          lastName: [
            agent.name.split(' ')[1] || '',
            [Validators.required, Validators.minLength(2)],
          ],

          phone: [
            agent.phone || '',
            [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)],
          ],

          // dateOfBirth: [this.editedAgent()?.phone ? this.editedAgent()?.dateOfBirth : ''],

          gender: [agent.gender || '', Validators.required],

          email: [
            { value: agent.email || '', disabled: true },
            [Validators.required, Validators.email],
          ],

          // country: [this.editedAgent()?.country ? this.editedAgent()?.country : ''],
        });

        this.avatarPreview.set(this.agent()?.photo ?? '');
      },
      error: (err) => {
        toast.error(err.error.message || 'Failed to fetch agent details!');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  // -----------------------
  // Avatar
  // -----------------------

  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.avatarPreview.set(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  // ------------------
  // Drag & drop
  // ------------------

  // onDragOver(event: DragEvent) {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }

  // onDrop(event: DragEvent) {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   const files = event.dataTransfer?.files;

  //   if (!files?.length) return;

  //   this.handleFiles(files);
  // }

  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;

  //   if (!input.files?.length) return;

  //   this.handleFiles(input.files);
  // }

  // private handleFiles(files: FileList) {
  //   const validFiles: File[] = [];

  //   Array.from(files).forEach((file) => {
  //     const validType =
  //       file.type === 'image/svg+xml' ||
  //       file.type === 'image/png' ||
  //       file.type === 'image/jpeg' ||
  //       file.type === 'image/gif';

  //     if (validType) {
  //       validFiles.push(file);
  //     }
  //   });

  //   this.uploadedFiles.update((current) => [...current, ...validFiles]);
  // }

  // removeFile(index: number) {
  //   this.uploadedFiles.update((files) => files.filter((_, i) => i !== index));
  // }

  // --------------------------
  // Cancel
  // --------------------------

  cancel() {
    this.agentForm.reset({
      firstName: '',
      lastName: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      country: '',
      properties: 0,
    });

    this.avatarPreview.set(undefined);
    this.router.navigateByUrl('/dashboard/agents');
  }

  // ---------------
  // Submit
  // ---------------

  submit() {
    if (this.agentForm.invalid) {
      this.agentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const form = this.agentForm.value;

    const payload = {
      name: form.firstName + ' ' + form.lastName,
      email: form.email,
      gender: form.gender,
      phone: form.phone,
    };

    this.agentService.createAgent(payload).subscribe({
      next: (res) => {
        toast.success(res.message || 'Agent created successfully!');
        this.agentForm.reset();
      },
      error: (err) => {
        toast.error(err.error.message || 'Failed to create the agent. Try again!');
      },
      complete: () => {
        this.isSubmitting.set(false);
      },
    });
  }

  edit() {
    if (this.agentForm.invalid) {
      this.agentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const form = this.agentForm.value;

    const payload = {
      name: form.firstName + ' ' + form.lastName,
      gender: form.gender,
      phone: form.phone,
    };

    this.agentService.updateAgent(this.agentId(), payload).subscribe({
      next: (res) => {
        toast.success(res.message || 'Agent updated successfully!');
        this.agentForm.reset();
        this.router.navigateByUrl('/dashboard/agents');
      },
      error: (err) => {
        toast.error(err.error.message || 'Failed to update the agent. Try again!');
      },
      complete: () => {
        this.isSubmitting.set(false);
      },
    });
  }
}
