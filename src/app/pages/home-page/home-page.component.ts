import { Component, signal } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { ActionType, User } from '../../interface';
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
    id: "1",
    nombre: "Jose Carlos Medina Vasquez",
    puesto: "Developer",
    fechaIngreso: "2025-03-28",
    edad: 18,
    salario: "10 mil netos"
  },
  {
    id: "2",
    nombre: "Maria Garcia Lopez",
    puesto: "Designer",
    fechaIngreso: "2024-11-15",
    edad: 25,
    salario: "15 mil netos"
  },
  {
    id: "3",
    nombre: "Carlos Fernandez Perez",
    puesto: "Project Manager",
    fechaIngreso: "2023-06-10",
    edad: 35,
    salario: "20 mil netos"
  },
  {
    id: "4",
    nombre: "Ana Martinez Ruiz",
    puesto: "QA Engineer",
    fechaIngreso: "2022-09-22",
    edad: 29,
    salario: "18 mil netos"
  },
  {
    id: "5",
    nombre: "Luis Gomez Perez",
    puesto: "Backend Developer",
    fechaIngreso: "2021-04-05",
    edad: 32,
    salario: "22 mil netos"
  },
  {
    id: "6",
    nombre: "Sofia Ramírez Sanchez",
    puesto: "Frontend Developer",
    fechaIngreso: "2020-01-18",
    edad: 26,
    salario: "17 mil netos"
  }
]

  typeAction = signal<ActionType>('');
  isAction  = signal<boolean>(false);
  UserSelected = signal<User>(  {} as User);
  showToast = signal<boolean>(false)
  


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
    this.triggerToast()
  }

  triggerToast() {
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
    }, 5000);
  }
}
