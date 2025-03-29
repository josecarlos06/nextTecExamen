import { Component, signal } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { ActionType, Job, User } from '../../interface';
import { FormAsideComponent } from '../../components/form-aside/form-aside.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TableComponent, FormAsideComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  user : User[] = [{
    id : "1",
    nombre : "carlos medina",
    puesto : "developer",
    fechaIngreso : "2025-03-28",
    edad : 18,
    salario : '10 al mes'
  }]; 
  
  typeAction = signal<ActionType>('');
  isAction  = signal<boolean>(false);
  UserSelected = signal<User>(  {} as User);
  


  changeEvent ( event : Event ) {
    const { name, value } = event.target as HTMLInputElement;
    const data = {
      ...this.UserSelected(),
      [ name ]: value.trim()
    }
    this.UserSelected.set(data);
  }

  onAction(action: ActionType, user?: User) {
    this.typeAction.set(action); 
    this.isAction.set(true);
    if (action === 'agregar') {
      const newJob: User = {
        id: Date.now().toString(),
        nombre : '',
        puesto: '',
        fechaIngreso : '',
        salario : '',
        edad : 18
      }
      this.UserSelected.set(newJob);
    }
    if (action === 'editar' && user) {
      this.UserSelected.set(user);
    }
    if (action === 'eliminar' && user) {
      this.onDelete(user.id);
    }
  }

  onEdit(user: User) {
    const index = this.user.findIndex((u) => u.id === user.id);
    this.user[index] = { ...this.user[index], ...user };
    this.allReset();
  }

  onDelete(id: string) {
    const filters = this.user.filter((u) => u.id !== id); // Filtra el trabajo eliminado
    this.user = filters;
    this.allReset();
  }

  addUsers( user: User) {
    this.user = [...this.user, user];
    this.allReset();
  }

  allReset(){
    this.isAction.set(false); 
    this.typeAction.set(''); 
    this.UserSelected.set({} as User);
  }
}
