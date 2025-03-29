import { ChangeDetectorRef, Component, effect, input, Input, signal } from '@angular/core';
import { ActionType, Job, User } from '../../interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-aside.component.html',
  styleUrl: './form-aside.component.scss'
})

export class FormAsideComponent {
  data = input.required<User>();
  @Input() changeEvent!: (event: Event) => void;
  @Input() onEdit!: (user: User) => void;
  @Input() addUsers!: (user: User) => void;
  @Input() action!: ActionType;
  @Input() reset!: () => void;
  job = signal<Job[]>([]);
  error = signal<string>("")
  constructor() {
    this.getJobs()
  }

  
  async getJobs() {
    try {
      const datas = await fetch("https://67d0ea93825945773eb24739.mockapi.io/api/v1/getAllJobs")
      const resp = await datas.json();
      this.job.set(resp);
    } catch (e) {

    }
  }

  saveData(e: Event) {
    e.preventDefault();
    if (!this.data() || Object.keys(this.data()).length === 0 || Object.values(this.data()).some(val => val === '' || val === null)) {
      this.error.set("Existen datos vacios")
      return;
    }
    if (this.action === 'editar') {
      this.onEdit(this.data());
    }
    if (this.action === 'agregar') {
      this.addUsers(this.data());
    }
  }

  onClose() {
    this.reset()
  }

  formatDate(dateString: string | null) : string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
}
